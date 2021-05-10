from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json
from selenium.webdriver.common.keys import Keys


def contenido_TripAdvisor(user_input):
    # Headless is faster than a window browser and consumes less resources since there is no need for a GUI
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()
    options.add_argument('--headless') 
    PATH = "C:/WebDriver/bin/chromedriver.exe"
    driver = webdriver.Chrome(PATH, options=options)
    """ 
    driver.get('https://www.tripadvisor.es/Hotels')     #Lanzar la URL
    driver.find_element_by_xpath('//*[@id="_evidon-accept-button"]').click()    #Aceptar Cookies

    buscador = driver.find_element_by_xpath('//input')  #Buscar en la barra de busqueda
    time.sleep(1)
    buscador.send_keys(user_input)

    time.sleep(2)  
    driver.find_element_by_xpath('//*[@id="typeahead_results"]/a[1]/div[2]/div[1]').click() 
    """
    driver.get("https://www.tripadvisor.es/Tourism-g187514-Madrid-Vacations.html")  #Ejemplo con el link de Madrid (XPATH falla a veces)
    
    return driver.page_source

def info_TripAdvisor(location):
    output = {}
    output[location] = []
    #Variables aux
    array_cosas = []
    array_alojate = []
    array_come = []
    r = contenido_TripAdvisor(location)
    soup = BeautifulSoup(r, 'lxml')

    contenedor = soup.find_all(class_="_1HQROFP")   # Clase general con toda la informacion
    for filas in contenedor:
        haz_cosas = filas.find_all(class_="_2dicJkxa _1EJ8NpwH _21Eo9VeW _2shTTUfB")[1] # Clase de cosas que hacer
        for cositas in haz_cosas:
            cont_cosas = cositas.find_all(class_="DrjyGw-P _1SRa-qNz NGv7A1lw _1Pby4P1A _2cnjB3re _3j1Zx5J1 _1Z1zA2gh _3uNvbGKr _3SosR2yw") # Nombres por separado
            for nombre_cosas in cont_cosas:
                array_cosas.append(nombre_cosas.text)

        alojate = filas.find_all(class_="_2dicJkxa _1EJ8NpwH _21Eo9VeW _2shTTUfB")[2]   # Clase de alojamiento
        for alojate_clase in alojate:
            cont_alojate = alojate_clase.find_all(class_="DrjyGw-P _1SRa-qNz NGv7A1lw _1Pby4P1A _2cnjB3re _3j1Zx5J1 _1Z1zA2gh _3uNvbGKr _3SosR2yw") # Nombres por separado
            for nombre_alojamiento in cont_alojate:
                array_alojate.append(nombre_alojamiento.text)

        comer = filas.find_all(class_="_2dicJkxa _1EJ8NpwH _21Eo9VeW _2shTTUfB")[3]     # Clase de restaurantes
        for comer_clase in comer:
            cont_comer = comer_clase.find_all(class_="DrjyGw-P _1SRa-qNz NGv7A1lw _1Pby4P1A _2cnjB3re _3j1Zx5J1 _1Z1zA2gh _3uNvbGKr _3SosR2yw") # Nombres por separado
            for nombre_restaurante in cont_comer:
                array_come.append(nombre_restaurante.text)
        
        output[location].append({
            'Cosas que hacer': array_cosas,
            'Alojate en': array_alojate,
            'Comer en': array_come
        })
    return json.dumps(output, indent=3)


#print(info_TripAdvisor("Madrid"))