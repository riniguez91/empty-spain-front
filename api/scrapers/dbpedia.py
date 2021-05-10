from bs4 import BeautifulSoup
import requests
import re
import json

def obtener_informacion_de_provincia():
  user_input = input("Escribir la Provincia de la que se desea buscar: ")
  
  dict_provincias = {}
  dict_municipios = {}
  municipios = []
  page = requests.get("https://es.dbpedia.org/page/" + user_input)
  soup = BeautifulSoup(page.content, 'html.parser')
  
  #obtenemos la descripcion de las provincias y municipios
  comment = soup.find('p').get_text()
  
  #obtenemos la poblacion de las provincias y municipios
  poblacion = soup.find_all(property='prop-es:poblaciÃ³n')
  poblacion = re.findall('\d+', str(poblacion))

  #obtenemos el codigo postal de los que dispongan
  postal_code = soup.find_all(property="dbo:postalCode")
  postal_code = re.findall('\d+\s\d+\s-\d+\s\d+|\d+|\d+\s-\s\d+|\d+-\d+|\d+.\d+\s-\s\d+.\d|\d+-\d+', str(postal_code))
  
  for municipio in soup.find_all(rev='dbo:province'):
      municipios.append(re.sub("dbpedia-es:", "",municipio.get_text()))

  dict_municipios = {"comment":comment, "poblacion": poblacion, "municipios": municipios, "postalCode": postal_code}
  #dict_municipios = {"comment":comment, "poblacion": poblacion, "municipios": municipios}
  dict_provincias[user_input] = dict_municipios 
  jsn = json.dumps(dict_provincias)
  return jsn    # solo devuelve el json de la provincia buscada

def obtener_provincia_de_municipio(json_info_prov):
  user_input = input('Introducir el municipio a buscar: ')
  user_input = re.sub(' ', '_', user_input)
  pertenece=None
  for provincia in json.loads(json_info_prov):
    for municipio in json.loads(json_info_prov).get(provincia).get('municipios'):
      if municipio == user_input:
        pertenece = provincia
  #print('el municipio pertenece a :',pertenece)
  return pertenece

#json auxiliar para demostrar que busca en varias provincias
json_p = {"provincia1" : {"comment": "comm1", "poblacion": [12341234], "municipios":["muni1","muni2"], "postalCode":[1234]},
          "provincia2" : {"comment": "comm2", "poblacion": [56785678], "municipios":["muni3","muni4"], "postalCode":[5678]}}

#actualizamos el json con la nueva provincia
json_provincias = json.loads(obtener_informacion_de_provincia())
json_provincias.update(json_p)
json_provincias = json.dumps(json_provincias, indent=3)
#print(json.loads(json_provincias))   #Vista sin caracteres UNICODE
print(json_provincias)                #Print con formato Json pero con caracteres UNICODE 
print('El municipio pertenece a :',obtener_provincia_de_municipio(json_provincias))