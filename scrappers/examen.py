from bs4 import BeautifulSoup
import requests
import re

def getUrl(url, destinations):
    request = requests.get(url)
    soup = BeautifulSoup(request.content, 'lxml')

    parentComponent = soup.find(class_='riverItems')
    for child in parentComponent.findChildren('div', recursive=False):
        provincia = re.sub('^\s|\n', '', child.a.text)
        destinations[provincia] = child.a['href']
        print(provincia)

    user_choice = str(input("\nEscoja su destino: "))
    print()
    return destinations[user_choice]

def getServicesUrl():
    output = []
    ccaa = {}
    cities = {}

    ccaa_url = getUrl('https://www.minube.com/viajes/espana', ccaa)
    city_url = getUrl(ccaa_url, cities)
    city_services_url = re.sub('viajes', 'que_ver', city_url)
    soup = BeautifulSoup(requests.get(city_services_url).content, 'lxml')
    
    button = soup.find_all(class_='buttonMain btnSeeAll outline normal secondary')
    for i in range(len(button)-1):
        onclick = button[i]['onclick']
        unclean_url = re.search('\'\w.*\'', onclick)
        if unclean_url:
            button_url = re.sub('\'', '', unclean_url.group())
            output.append(button_url)
    
    return output

def main():
    services_urls = getServicesUrl()
    for url in services_urls:
        r = requests.get(url)
        soup = BeautifulSoup(r.content, 'lxml')
        title = soup.find(class_='titleList smaller').text
        pagination_container = soup.find(class_='paginationContainer')
        numPages = 1
        if pagination_container:
            numPages = int(pagination_container.findChildren('a', recursive=False)[-2].text)
        print(title, '\n-----------------')
        for i in range(numPages):
            parentComponent = soup.find(class_='riverItems')
            for child in parentComponent.findChildren('div', recursive=False):
                if child.a:
                    description = child.a.text
                    print(' {}'.format(re.sub('^\s|\n', '', description)))
        print()

main()    
    

