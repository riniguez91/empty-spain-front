import base64
from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
from re import search
import json


def wiki_url(user_input):
    # Headless is faster than a window browser and consumes less resources since there is no need for a GUI
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()

    options.add_argument('--headless') 
 
    PATH = 'C:/WebDriver/bin/chromedriver.exe' 

    driver = webdriver.Chrome(PATH, options=options)
    string_user_input = user_input + " pueblo ciudad"          #Se añade ciudad para asegurarse de que busca pueblo no otra cosa
    driver.get('https://www.google.com/search?q={}'.format(string_user_input))     #Look for the search URL
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="L2AGLb"]/div').click()           #Accepting Google Cookies
    
    #Comprobar si hay pueblo recomendado para acceder
    try:
        #driver.find_element_by_xpath('//*[@id="rhs"]/div[2]/div/div/div[1]/div/div[2]/div/a/div/div').click()
        driver.find_element_by_xpath('//*[@id="rhs"]/div/div/div/div[1]/div/div[2]/div/a/div/div').click()
    except Exception as e:
        None

    return driver.page_source

#Coge la imagen de "google imagenes" para mayor calidad
def wiki_imagen(user_input):
    options = webdriver.ChromeOptions()
    options.add_argument('--headless') 
    PATH = 'C:/WebDriver/bin/chromedriver.exe' 
    driver = webdriver.Chrome(PATH, options=options)
    string_user_input = user_input + " pueblo ciudad"
    driver.get('https://www.google.com/search?q={}'.format(string_user_input))     #Look for the search URL
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="L2AGLb"]/div').click()           #Accepting Google Cookies
    try: driver.find_element_by_xpath('//*[@id="rhs"]/div/div/div/div[1]/div/div[2]/div/a/div/div').click()
    except Exception as e: None
    time.sleep(2)
    try:
        driver.find_element_by_xpath('//*[@id="media_result_group"]/div[1]/div/div[2]/div/div/a/g-img/div').click()
        time.sleep(3)
        imagen_municipio = driver.find_element_by_xpath('//*[@id="Sva75c"]/div/div/div[3]/div[2]/c-wiz/div/div[1]/div[1]/div/div[2]/a/img').get_attribute('src')
    except Exception as e:
        imagen_municipio = "https://programacion.net/files/article/20160819020822_image-not-found.png"

    return imagen_municipio

# using BeautifulSoup to scrap the map view, type of locality, population, a short description in the preview area about the location.
def wiki_content(location):
    output = {}
    decoded_location = location.decode('utf-8') 
    r = wiki_url(decoded_location)
    soup = BeautifulSoup(r, 'lxml')
    
    dict_response = {}
    mapa_url = ""
    imagen = ""
    poblacion = ""
    descripcion_edit = ""
    tipo_localidad = ""

    # Looking for the fields we need using BS4
    contenedor = soup.find_all(class_="I6TXqe osrp-blk")
    for i in contenedor:
        mapa = i.find(class_="lu-fs").attrs['src']
        mapa_url = "https://google.com" + mapa
        imagen = wiki_imagen(decoded_location)

        """ imagen = i.find(class_="GMCzAd BA0A6c")
        if (imagen): imagen = imagen.find('img', recursive=False).attrs['src']
        else: imagen = "" """

        nombre = i.find("h2").text
        tipo_localidad = i.find(class_="wwUB2c PZPZlf E75vKf")
        if (tipo_localidad):
            tipo_localidad = tipo_localidad.text
        else: tipo_localidad = ""
        
        descripcion = i.find(class_="kno-rdesc")
        if (descripcion):
            descripcion = descripcion.text
            # Edit the text to avoid useless terms. 
            descripcion_edit = descripcion.replace("Wikipedia"," ").replace("Descripción","")
        

        contenedor_info = i.find_all(class_="rVusze")
        # We only need information about population from this level so we discard every other data
        for filas in contenedor_info:
            if search("Población", filas.text):
                poblacion = filas.text
                
    # Converting the return value into a json
    dict_response = {'locality_type': tipo_localidad, 'population':poblacion, 'description':descripcion_edit,'map': mapa_url, 'imagen': imagen}
    json_response = json.dumps(dict_response, indent=3)

    return json_response

#print(wiki_content(b'Samaniego'))  #Click en recomendados
#print(wiki_content(b'Madrid'))     #Directamente la busqueda