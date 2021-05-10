from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json

def getUrl(location):
    transformed_location = location.lower().replace(" ", "-").replace("ñ","n")
    return transformed_location

def contenido_tiempo(location):
    # Headless is faster than a window browser and consumes less resources since there is no need for a GUI
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()
    user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    options.add_argument('user-agent={}'.format(user_agent))
    options.add_argument('--incognito')
    options.add_argument('--headless') 
    options.add_argument('--enable-javascript')
    PATH = "C:/WebDriver/bin/chromedriver.exe"

    driver = webdriver.Chrome(PATH, options=options)
    driver.get('https://www.eltiempo.es/{}.html'.format(getUrl(location)))     #Lanzar la URL
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="didomi-notice-agree-button"]').click()
    contenido = driver.page_source

    return contenido

def scrape(location):
    output = {}
    r = contenido_tiempo(location)
    soup = BeautifulSoup(r, 'lxml')
    
    table = soup.find(class_='m_table_weather_day_wrapper')
    for column in table.findChildren('div', recursive=False):
        date = column.find(class_='m_table_weather_day_date')
        temps = column.find(class_='m_table_weather_day_max_min')
        rain = column.find(class_='m_table_weather_day_child m_table_weather_day_rain')
        wind = column.find(class_='m_table_weather_day_wind_ico')
        day_dawn = column.find(class_='m_table_weather_day_child m_table_weather_day_dawn')
        day_nightfall = column.find(class_='m_table_weather_day_child m_table_weather_day_nightfall')

        output[re.sub('\s{2,}', '', date.contents[5].text)] = {
            'Max temp': temps.contents[1].text,
            'Min temp': temps.contents[3].text,
            'Rain': rain.contents[3].text,
            'Wind': wind.contents[2].text,
            'Day dawn': re.sub('\s+', ' ', day_dawn.contents[3].text),
            'Day nightfall': re.sub('\s+', '', day_nightfall.contents[3].text)
        }
    
    return json.dumps(output, indent=3) 

print(scrape("Brunete"))