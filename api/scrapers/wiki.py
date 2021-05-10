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
    driver.get('https://www.google.com/search?q={}'.format(user_input))     #Look for the search URL
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="zV9nZe"]/div').click()    #Accepting Google Cookies
    
    return driver.page_source

# using BeautifulSoup to scrap the map view, type of locality, population, a short description in the preview area about the location.
def wiki_content(location):
    output = {}
    decoded_location = location.decode('utf-8') 
    r = wiki_url(decoded_location)
    soup = BeautifulSoup(r, 'lxml')
    
    dict_response = {}

    # Looking for the fields we need using BS4
    contenedor = soup.find_all(class_="I6TXqe osrp-blk")
    for i in contenedor:
        mapa = i.find(class_="lu-fs").attrs['src']
        nombre = i.find("h2").text
        tipo_localidad = i.find(class_="wwUB2c PZPZlf E75vKf").text
        descripcion = i.find(class_="kno-rdesc").text
        
        # Edit the text to avoid useless terms. 
        descripcion_edit = descripcion.replace("Wikipedia"," ").replace("Descripción","")

        contenedor_info = i.find_all(class_="rVusze")
        # We only need information about population from this level so we discard every other data
        for filas in contenedor_info:
            if search("Población", filas.text):
                poblacion = filas.text
                
    # Converting the return value into a json
    dict_response = { nombre:{'locality_type': tipo_localidad, 'population':poblacion, 'description':descripcion_edit,'map': mapa} }
    json_response = json.dumps(dict_response, indent=3)

    return json_response

""" print(wiki_content('Barbate')) """