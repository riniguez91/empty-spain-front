from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json
from selenium.webdriver.common.keys import Keys

# Transforms a string ex.'Villanueva de la Cañada' to the domain format ex.'villanueva_de_la_canada'
def getUrl(location):
    #transformed_location = location.lower().replace(" ", "-").replace("ñ","n") #Link directo
    transformed_location = re.sub('/\w+.+', '', location)       #quitar todo lo que está a la derecha de una "/"
    print(transformed_location)
    return transformed_location

# Uses Selenium to obtain page source since we get blocked if we do a normal request w/o the library
def contenido_tiempo(location):
    # Headless is faster than a window browser and consumes less resources since there is no need for a GUI
    options = webdriver.ChromeOptions()
    #user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    #options.add_argument('user-agent={}'.format(user_agent))
    #options.add_argument('--incognito')
    options.add_argument('--headless')
    #options.add_argument('--enable-javascript')
    PATH = 'C:/WebDriver/bin/chromedriver.exe'

    driver = webdriver.Chrome(PATH, options=options)
    #driver.get('https://www.eltiempo.es/{}.html'.format(getUrl(location)))     #Link directo
    driver.get('https://www.eltiempo.es')
    time.sleep(1)
    driver.find_element_by_xpath('//*[@id="didomi-notice-agree-button"]').click()
    
    #driver.find_element_by_xpath('//*[@id="term"]').click()   #Sin headless
    driver.find_element_by_xpath('//*[@id="page"]/nav/div[2]/div[2]/ul/li[2]/button').click()   #Necesario para headless
    driver.find_element_by_xpath('//*[@id="term"]').send_keys(getUrl(location))
    time.sleep(2)

    #Comprobar si está la locacalidad
    try:
        driver.find_element_by_xpath('//*[@id="search"]/ul/li[1]/a').click()
    except Exception as e:
        print("No ha recogido el page_source de selenium.")

    contenido = driver.page_source


    return contenido

# Returns JSON containing city weather
def scrape_tiempo(location):
    # We decode the parameter since we are calling the function from a separate server and parameters info is binary-enconded
    decoded_location = location.decode('utf-8')
    output = []
    r = contenido_tiempo(decoded_location)
    soup = BeautifulSoup(r, 'lxml')
    print(soup.find(class_="m_table_weather_day_max_temp"))
    try:
        # Obtain table wrapper and iterate through its rows to obtain data
        table = soup.find(class_='m_table_weather_day_wrapper')
        for column in table.findChildren('div', recursive=False):
            date = column.find(class_='m_table_weather_day_date')
            temps = column.find(class_='m_table_weather_day_max_min')
            rain = column.find(class_='m_table_weather_day_child m_table_weather_day_rain')
            wind = column.find(class_='m_table_weather_day_wind_ico')
            day_dawn = column.find(class_='m_table_weather_day_child m_table_weather_day_dawn')
            day_nightfall = column.find(class_='m_table_weather_day_child m_table_weather_day_nightfall')

            output.append({
                'Day': re.sub('\s{2,}', '', date.contents[5].text),
                'Max temp': temps.contents[1].text,
                'Min temp': temps.contents[3].text,
                'Rain': rain.contents[3].text,
                'Wind': wind.contents[2].text,
                'Day dawn': re.sub('\s+', ' ', day_dawn.contents[3].text),
                'Day nightfall': re.sub('\s+', '', day_nightfall.contents[3].text)
            })
    except Exception as e:
        print("Error en la funcion de BeautifulSoup.")
    
    return json.dumps(output, indent=3)
    
#print(scrape_tiempo(b'Ayala/Aiara'))