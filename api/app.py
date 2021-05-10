from flask import Flask, jsonify, abort, request, make_response, url_for
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer
from flask_cors import CORS
from scrapers.tripadvisor_v1 import informacion_detallada
from scrapers.tiempo import scrape_tiempo
from scrapers.twitter import scrape, sns

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
def tripadvisor():
    return informacion_detallada(request.data)

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

if __name__ == '__main__':
    app.run(debug=True)