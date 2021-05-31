from flask import Flask, jsonify, abort, request, make_response, url_for
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
from flask_cors import CORS
from scrapers.tripadvisor_v1 import informacion_detallada
from scrapers.tripadvisor_v2 import info_TripAdvisor
from scrapers.tiempo import scrape_tiempo
from scrapers.twitter import scrape, sns
from scrapers.wiki import wiki_content
from scrapers.elPais import model_prediction

app = Flask(__name__)
CORS(app)

# Handles 404 errors where there is an incorrect route passed in the URL
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( {'error': 'Not found'}), 404)

# Used to test textblob library with sentiment analysis (DOESN'T work when translating english to english!)
@app.route('/sentimiento', methods=['POST'])
def get_sentimiento():
    texto_introducido = str(request.data)
    texto = TextBlob(texto_introducido)
    text = texto.translate(to="en")
    result = text.sentiment 

    return jsonify({'resultado': result})

# Tripadvisor scraper returns the city JSON hotels
@app.route('/scrapers/tripadvisor/v1', methods=['POST'])
def tripadvisor_v1():
    return informacion_detallada(request.data)

# Tripadvisor scraper returns JSON with things to do, restaurants and hotels
@app.route('/scrapers/tripadvisor/v2', methods=['POST'])
def tripadvisor_v2():
    return info_TripAdvisor(request.data)

# eltiempo.es scrapers returns city JSON weather
@app.route('/scrapers/tiempo', methods=['POST'])
def tiempo():
    return scrape_tiempo(request.data)

# Twitter scraper calls tweepy API
@app.route('/scrapers/twitter/tweepy', methods=['POST'])
def twitter_tweepy():
    return scrape(request.data)

# Twitter scrapper calls sns library
@app.route('/scrapers/twitter/sns', methods=['POST'])
def twitter_sns():
    return sns(request.data)

# Wikipedia scrapper
@app.route('/scrapers/wiki', methods=['POST'])
def wiki():
    return wiki_content(request.data)

# Call the model to determine the state of a municipio
@app.route('/model/prediction', methods=['POST'])
def model_result():
    return model_prediction(request.data)
    

if __name__ == '__main__':
    app.run(debug=True)
