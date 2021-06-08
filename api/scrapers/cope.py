from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json

link = []
def cope_content(user_input):
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()
    user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    options.add_argument('user-agent={}'.format(user_agent))
    options.add_argument('--incognito')
    options.add_argument('--headless') 
    options.add_argument('--enable-javascript')
    PATH = 'C:/WebDriver/bin/chromedriver.exe'  

    pagina = "https://www.cope.es/emisoras/" + user_input
    driver = webdriver.Chrome(PATH, options=options)
    driver.get(pagina)              #Lanzar la URL
    time.sleep(1)
    #driver.find_element_by_xpath('//*[@id="qc-cmp2-ui"]/div[2]/div/button[2]').click()    #Aceptar Cookies
    driver.find_element_by_xpath('//*[@id="didomi-notice-agree-button"]').click()    #Aceptar Cookies

    return driver.page_source       #Recoger todo el html de la pagina

def text(user_input):
    noticias = {}
    noticias["COPE News in " + user_input] = []

    page_source = cope_content(user_input.lower()) #Se llama a la funcion 'cope_content' para obtener el contenido de la pagina donde estan las noticias
    soup = BeautifulSoup(page_source, 'lxml')
    contenedor = soup.find_all(class_="lateral right article")  #Div donde estan las noticias
    for i in contenedor:
        titulo = i.find(class_="title")
        subtitulo = i.find(class_="subtitle")
        link = i.find('a').attrs['href']
        link_completo = "https://www.cope.es/" + str(link)
        
        noticias["COPE News in " + user_input].append({
            'Name': titulo.text,
            'Subtitle':'' if not subtitulo else subtitulo.text,
            'URL':link_completo
        })
    return json.dumps(noticias, indent=3)

###########
#user_input = str(input("Introduce el nombre del pueblo donde desea buscar noticias: "))
#print(text("Madrid"))