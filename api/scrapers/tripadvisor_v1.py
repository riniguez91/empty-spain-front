from selenium import webdriver
import time
import requests
from bs4 import BeautifulSoup
import re
import json


def link_zona_hoteles(user_input):
    query = "Hoteles en " + user_input
    # Headless is faster than a window browser and consumes less resources since there is no need for a GUI
    #Headless para evitar que se lance la ventana de chrome, ahorrando recursos ya que no se necesitan para la Interfaz Gráfica de Usuario
    options = webdriver.ChromeOptions()
    user_agent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 13_2_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.0.3 Mobile/15E148 Safari/604.1'
    options.add_argument('user-agent={}'.format(user_agent))
    options.add_argument('--incognito')
    options.add_argument('--headless') 
    options.add_argument('--enable-javascript')
    PATH = 'C:/WebDriver/bin/chromedriver.exe'

    driver = webdriver.Chrome(PATH, options=options)
    driver.get('https://www.tripadvisor.es/Hotels')     #Lanzar la URL
    driver.find_element_by_xpath('//*[@id="_evidon-accept-button"]').click()    #Aceptar Cookies
    buscador = driver.find_element_by_xpath('//input')  #Buscar en la barra de busqueda
    buscador.send_keys(query)      #Introducir la consulta del usuario en la barra de búsqueda
    time.sleep(1)           #Espera 1segundo
    driver.find_element_by_xpath('//*[@id="typeahead_results"]/a[4]/div[2]/div[1]').click()  #Buscar los hoteles (Siempre esta en 4 posicion)

    url_consulta = driver.current_url   #Captura la URL con los hoteles del lugar introducido por el usuario
    return url_consulta

hoteles = []    #Nombre de los hoteles
url_hotel = []  #Link de los hoteles
def info_basica_varias_paginas(user_input):
    paginas = [""]      #Array con el formato que sigue el paginado de TripAdvisor (para coger más paginas sería "oa30-" -> "oa60-" -> "oa90-" -> "oa120-"...)

    #Separar los links
    url_consulta = link_zona_hoteles(user_input)
    segunda_parte_url = re.sub('.*\d-', '', url_consulta)               #coger todo desde el inicio hasta llegar a un digito y guion
    primera_parte_url = re.sub('\w+-Hotels.html', '', url_consulta)     #coger cualquier "word character" 1 o más veces hasta llegar a -Hotels.html 

    hoteles_basico = {}     #Diccionario para guardar la información basica de los hoteles
    hoteles_basico[user_input] = []
    dominio_tripAdvisor = "https://www.tripadvisor.es/"
    
    for numero_pagina in range(len(paginas)):
        pagina_actual = primera_parte_url + paginas[numero_pagina] + segunda_parte_url
        r = requests.get(pagina_actual)
        soup = BeautifulSoup(r.text, 'lxml')
        #Div que contiene toda la informacion necesaria
        bloque = soup.find_all(class_="prw_rup prw_meta_hsx_responsive_listing ui_section listItem")[:5]
        for i in bloque:
            #Nombre Hotel
            hotel = i.find(class_="property_title prominent")
            hotel_format = re.sub('\s{2,}', '', hotel.text)
            hoteles.append(hotel_format)    
            #Link hotel
            link = i.find('a', class_="property_title prominent").attrs['href']
            url_hotel.append(dominio_tripAdvisor +str(link))
            #Descripcion hotel
            descripcion = i.find(class_='prw_rup prw_common_hotel_icons_list linespace is-shown-at-tablet')
            #Diccionario con la información basica (Nombre, Url, descripción, numero de la pagina en la que se encuentra el hotel)
            hoteles_basico[user_input].append(
            {
                'Name': hotel_format,
                'URL': dominio_tripAdvisor + link,
                'Description': descripcion.text,
                'Page No.': numero_pagina+1
            })
    return json.dumps(hoteles_basico, indent=3)

####################################################################################################
def informacion_detallada(user_input):
    decoded_user_input = user_input.decode('utf-8') 
    hoteles_detallado = {}
    hoteles_detallado[decoded_user_input] = []
    info_basica_varias_paginas(decoded_user_input)    #Se llama a la funcion "info_basica_varias_paginas" para cargar los nombres y links de los hoteles, y también la cantidad de hoteles que hay (con el length)

    for count in range(len(url_hotel)):         #bucle que itera el numero de 'url_hotel', es decir, el total de hoteles que hay
        r = requests.get(url_hotel[count])
        soup = BeautifulSoup(r.text, 'lxml')

        valoracion_total = soup.find(class_="_3cjYfwwQ")
        total_valoraciones = soup.find(class_="_3jEYFo-z")
        precio_hotel = soup.find(class_="CEf5oHnZ")
        container_descripcion = soup.find(class_="_3koVEFzz")
        descripcion_detallada_hotel = container_descripcion.find(class_="cPQsENeY")
        caracteristicas_hotel = soup.find_all(class_="_1nAmDotd")   #Encuentra todas las caracteristas del hotel (posicion1 -> Servicios del hotel, posicion2 -> Servicios de la habitación, posicion3 -> Tipo de habitación)
        valoraciones_separadas = soup.find_all(class_="_1krg1t5y")  #Encuentra las valoraciones separadas (1->Ubicacion, 2->Limpieza, 3->Servicio, 4->Relacion Calidad-precio)
        
        # A -1 score indicates the value does not exist since it isn't provided (the equivalent of an N/A in its float version)
        hoteles_detallado[decoded_user_input].append({
            'Name': hoteles[count],
            'URL': url_hotel[count],
            'Detailed description': 'N/A' if not descripcion_detallada_hotel else descripcion_detallada_hotel.text, #Si está vacio pone 'N/A', sino la descripcion
            'Mean review score': valoracion_total.text,
            'Total reviews': total_valoraciones.text,
            'Price': 'N/A' if not precio_hotel else precio_hotel.text,                                              #Si no existe precio se pone 'N/A', sino se pone el precio
            'Hotel services': caracteristicas_hotel[0].text,                                                        #
            'Room services': 'N/A' if 1 == len(caracteristicas_hotel) else caracteristicas_hotel[1].text,           #Si el tamaño de caracteristicas_hotel es 1 -> no tiene room services, por tanto se pone 'N/A'
            'Room type': 'N/A' if not 3 == len(caracteristicas_hotel) else caracteristicas_hotel[2].text,           #Si el tamaño de caracteristicas_hotel no es 3 -> no tiene Room type, por tanto se pone 'N/A'
            'Ubicación': -1,
            'Limpieza': -1,
            'Servicio': -1,
            'Relación calidad-precio': -1
        })  

        for info in valoraciones_separadas:
            tipo_caracteristica = info.find(class_='_1h7NKZWM').text                        #Se coge la clase con el nombre de la caracteristica
            testvaloracion_caracteristica = float(info.span['class'][1].split("_")[1])/10   #Se coge el valor 2 del span dentro de la clase del tipo_caracteristica ('_1h7NKZWM') (Coincide con el texto) 
                                                                                            #Se hace split de la clase en posicion2 (bubble_40), para quedarnos con el valor, se pasa a float y se divide entre 10 para sacar la valoracion
            current_dict = hoteles_detallado[decoded_user_input][count]                             #Se accede al diccionario 
            current_dict[tipo_caracteristica] = testvaloracion_caracteristica               #Accede al tipo de caracteristica, si coincide con 'Ubicacion, Limpieza, Servicio, Relacion calidad-precio' mete el valor, sino se queda con valor -1

    return json.dumps(hoteles_detallado, indent=3)

############

# user_input = str(input("Introducir el municipio en el cual quieres buscar hoteles (ej: Madrid): ")) 
# print(informacion_detallada())