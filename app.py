from flask import Flask, jsonify, abort, request, make_response, url_for
from textblob import TextBlob
from textblob.sentiments import NaiveBayesAnalyzer

app = Flask(__name__)

# Handles 404 errors where there is an incorrect route passed in the URL
@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify( {'error': 'Not found'}), 404)

# Used to test textblob library with sentiment analysis
@app.route('/sentimiento', methods =['GET'])
def get_sentimiento():
    texto_introducido = "Odio los libros."
    texto = TextBlob(texto_introducido)
    text = texto.translate(to="en")
    result = text.sentiment 

    print(result)
  
    return jsonify({'resultado': result})


if __name__ == '__main__':
    app.run(debug = True)