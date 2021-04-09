import requests
import re
import json
from bs4 import BeautifulSoup

# Transforms the given place name to a valid search URL: "Boadilla del monte" -> "boadilla-del-monte"
def getUrl(location):
    transformed_location = location.lower().replace(" ", "-")
    return transformed_location

# Send a request to 'eltiempo.es' and using BeautifulSoup scrap the weather forecast such as min/max temperature, day dawn/nightfall etc.
def scrape(location):
    output = {}
    # Pass chrome headers so that the website doesn't identify us as a bot and denies our access
    headers = {'user-agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1', 'accept-encoding': 'gzip, deflate, br'}
    response = requests.get('https://www.eltiempo.es/{}.html'.format(getUrl(location)), headers=headers)
    soup = BeautifulSoup(response.text, 'lxml')
    
    # Find parent element (table) 
    table = soup.find(class_='m_table_weather_day_wrapper')
    for column in table.findChildren('div', recursive=False):
        date = column.find(class_='m_table_weather_day_date')
        temps = column.find(class_='m_table_weather_day_max_min')
        rain = column.find(class_='m_table_weather_day_child m_table_weather_day_rain')
        wind = column.find(class_='m_table_weather_day_wind_ico')
        day_dawn = column.find(class_='m_table_weather_day_child m_table_weather_day_dawn')
        day_nightfall = column.find(class_='m_table_weather_day_child m_table_weather_day_nightfall')

        # Since we use .contents we obtain a bs4.element.Tag object which gives us the information on different positions in an array, we simply obtain the required using indices
        output[re.sub('\s{2,}', '', date.contents[5].text)] = {
            'Max temp': temps.contents[1].text,
            'Min temp': temps.contents[3].text,
            'Rain': rain.contents[3].text,
            'Wind': wind.contents[2].text,
            'Day dawn': re.sub('\s+', '', day_dawn.contents[3].text),
            'Day nightfall': re.sub('\s+', '', day_nightfall.contents[3].text)
        }
    
    return json.dumps(output, indent=3)

print(scrape("Villanueva de la Canada"))

