from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json
from selenium.webdriver.common.keys import Keys

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
    driver.get("https://elpais.com/buscador/")              #Lanzar la URL
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="didomi-notice-agree-button"]').click()
    driver.find_element_by_xpath('//*[@id="formulario_busquedas"]/input[1]').send_keys(user_input)
    time.sleep(2)
    driver.find_element_by_xpath('//*[@id="formulario_busquedas"]/input[1]').send_keys(Keys.ENTER)
    time.sleep(2)

    return driver.page_source       #Recoger todo el html de la pagina

def text_elpais(user_input):
    decoded_location = user_input.decode('utf-8')
    noticias = {}
    noticias["ELPAIS News in " + decoded_location] = []
    titulo, link_completo, subtitulo = "","",""

    page_source = elpais_content(decoded_location) #Se llama a la funcion 'cope_content' para obtener el contenido de la pagina donde estan las noticias
    soup = BeautifulSoup(page_source, 'lxml')
    #print(soup.text)
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

        noticias["ELPAIS News in " + decoded_location].append({
            'Name': titulo,
            'Subtitle': subtitulo,
            'URL': link_completo
        })
    return json.dumps(noticias, indent=3)

#Llama a "text_elpais" para rellenar el array y devolverlo para el scrapper de PC1
def elpais_pc1(user_input):
    text_elpais(user_input)
    return array_textos_noticias
#print(text_elpais(b"Brunete"))