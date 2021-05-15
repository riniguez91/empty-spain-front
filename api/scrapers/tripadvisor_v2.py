from selenium import webdriver
import time
from bs4 import BeautifulSoup
import json
from selenium.webdriver.common.keys import Keys

url = []

def contenido_TripAdvisor(user_input):
    # Headless is faster than a window browser and consumes less resources since there is no need for a GUI
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()
    options.add_argument('--headless') 
    PATH = "C:/WebDriver/bin/chromedriver.exe"
    driver = webdriver.Chrome(PATH, options=options)
    driver.get('https://www.tripadvisor.es/Hotels')     #Lanzar la URL
    driver.find_element_by_xpath('//*[@id="_evidon-accept-button"]').click()    #Aceptar Cookies

    window_before = driver.window_handles[0]
    buscador = driver.find_element_by_xpath('//input').send_keys(user_input)  #Buscar en la barra de busqueda
    time.sleep(1)
    driver.find_element_by_xpath('//input').send_keys(Keys.ENTER)
    time.sleep(3)
        
    cont = driver.find_element_by_xpath('//*[@id="BODY_BLOCK_JQUERY_REFLOW"]/div[2]/div/div[2]/div/div/div/div/div[1]/div/div[1]/div/div[3]/div/div[1]/div/div[2]/div/div/div/div/div').click()
    time.sleep(2)

    window_after = driver.window_handles[1]
    driver.switch_to.window(window_after)
    time.sleep(2)
    url.append(driver.current_url)      # Url

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
            'Url': url[-1],
            'Cosas que hacer': array_cosas,
            'Alojate en': array_alojate,
            'Comer en': array_come
        })
    return json.dumps(output, indent=3)

#print(info_TripAdvisor("Navacerrada"))