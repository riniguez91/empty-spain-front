from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json
from selenium.webdriver.common.keys import Keys

import pickle
import pandas as pd

array_textos_noticias = []
link = []
def elpais_content(user_input):
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()
    user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    options.add_argument('user-agent={}'.format(user_agent))
    options.add_argument('--incognito')
    options.add_argument('--headless') 
    options.add_argument('--enable-javascript')
    PATH = 'C:/WebDriver/bin/chromedriver.exe'  

    
    driver = webdriver.Chrome(PATH, options=options)
    try:
        driver.get("https://elpais.com/buscador/")              #Lanzar la URL
        time.sleep(2)
        driver.find_element_by_xpath('//*[@id="didomi-notice-agree-button"]').click()
        driver.find_element_by_xpath('//*[@id="formulario_busquedas"]/input[1]').send_keys(user_input)
        time.sleep(2)
        driver.find_element_by_xpath('//*[@id="formulario_busquedas"]/input[1]').send_keys(Keys.ENTER)
        time.sleep(2)
        source = driver.page_source
    except Exception as e:
        source = ""

    return source       #Recoger todo el html de la pagina

def text_elpais(user_input):
    noticias = {}
    noticias["ELPAIS News in " + user_input] = []
    titulo, link_completo, subtitulo = "","",""

    page_source = elpais_content(user_input) #Se llama a la funcion 'cope_content' para obtener el contenido de la pagina donde estan las noticias
    soup = BeautifulSoup(page_source, 'lxml')
    try:
        contenedor = soup.find_all(class_="noticia")  #Div donde estan las noticias
        for i in contenedor:
            #Titulo
            try:
                titulo = i.find(title="Ver noticia").text
            except Exception as e:
                None
            #Link
            try:
                link = i.find(title="Ver noticia").attrs['href']
                link_completo = "https://elpais.com" +str(link)
            except Exception as e:
                None
            #Subtitulo
            try:
                subtitulo = i.find('p').text
                array_textos_noticias.append(subtitulo)
            except Exception as e:
                None

            noticias["ELPAIS News in " + user_input].append({
                'Name': titulo,
                'Subtitle': subtitulo,
                'URL': link_completo
            })
    except Exception as e:
        noticias["ELPAIS News in " + user_input].append({
                'Name': titulo,
                'Subtitle': subtitulo,
                'URL': link_completo
            })
    return json.dumps(noticias, indent=3)
#print(text_elpais("Talavera de la Reina"))

#Llama a "text_elpais" para rellenar el array y devolverlo para el scrapper de PC1
def elpais_pc1(user_input):
    text_elpais(user_input)
    return array_textos_noticias

def model_prediction(user_input):
     #Scrapper ElPais
    array_textos_noticias = elpais_pc1(user_input.decode('utf-8'))
    model = pickle.load(open('api/scrapers/data-pc1/trained_model.sav', 'rb'))
    tfidf = pickle.load(open('api/scrapers/data-pc1/tfidf.pkl', 'rb'))
    df = pd.read_excel('api/scrapers/data-pc1/Noticias_Excel.xlsx', engine='openpyxl')
    df['category_id'] = df['Category'].factorize()[0] #Se cambia la categoria 0-> despoblacion 1-> no despoblacion
    result = ''

    category_id_df = df[['Category', 'category_id']].drop_duplicates().sort_values('category_id') #quita los valores duplicados y ordena
    id_to_category = dict(category_id_df[['category_id', 'Category']].values)

    #España pueblo vaciada
    text_features = tfidf.transform(array_textos_noticias)
    predictions = model.predict(text_features)
    cont_desp = 0
    cont_no_desp = 0

    for text, predicted in zip(array_textos_noticias, predictions):
      if (id_to_category[predicted] == "No Despoblacion"):
        cont_no_desp += 1
      else:
        cont_desp += 1 
    #La variable con mayor valor -> resultado
    if (cont_desp < cont_no_desp): result = "No Despoblacion"
    else: result = "Despoblacion"

    json_response = json.dumps({"result": result}, indent=3)
    return json_response

# print(model_prediction(b'Brunete'))