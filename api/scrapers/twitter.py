import os
import json
from tweepy import OAuthHandler, API, Cursor, StreamListener, Stream
import snscrape.modules.twitter as sntwitter
from textblob import TextBlob
from deep_translator import GoogleTranslator

# Git + Python 3.8+ is required: pip install git+https://github.com/JustAnotherArchivist/snscrape.git
# Tweepy: pip install tweepy

# Tokens for the OAuthHandler
consumer_key = 'QUBVv6DsoPTV94SnNPSil8Wd0'
consumer_seret = 'Sr2S5H5ujJsfBuOpGi6nL5VioRwvyBValf0Q8YPNAGhyWPjvC7'
access_token = '1379721818332872705-EAOIDHfV1482CHUNjyCtTha56wpfsG'
access_token_secret = 'Ysf6NCGKRdzIU5NrLagciNZp4dbz44qZHkA3LMD4WNLgs'

# We set the connection to the tweepy API
auth = OAuthHandler(consumer_key, consumer_seret)
auth.set_access_token(access_token, access_token_secret)
api = API(auth)

# Tweepy function, we obtain the most relevant and the most recent with the mixed search_type param
def scrape(query, num_tweets=10):
    output = []
    # We decode the parameter since we are calling the function from a separate server and parameters info is binary-enconded
    engine_query = '#' + query.decode('utf-8') + ' -filter:retweets'
    # There is no need to check if there is a list of tweets returned from Cursor() since if thats the case it won't enter the for loop and thus raise no exceptions
    for i, tweet in enumerate(Cursor(api.search, q=engine_query, lang='es', search_type='mixed').items(num_tweets)):
        output.append({
            'Tweet_No': str(i+1),
            'Date': str(tweet.created_at),
            'ID': tweet.id_str,
            'Content': tweet.text,
            'Username': tweet.user.name
        })

    return json.dumps(output, indent=3)

# Snscrape function to obtain the tweets relevant to a less known town since the Tweepy API is limited to 7-days on the search (we're using the standard license)
def sns(query, num_tweets=10):
    output = []
    # We decode the parameter since we are calling the function from a separate server and parameters info is binary-enconded
    engine_query = '#' + query.decode('utf-8') + ' -filter:retweets'
    for i, tweet in enumerate(sntwitter.TwitterSearchScraper(engine_query).get_items()):
        # We need to limit the no. of tweets manually since the sns Python wrapper doesn't include the functionality
        if i > num_tweets-1:
            break
        try:
            to_translate = tweet.content
            translated = GoogleTranslator(source='auto', target='en').translate(to_translate)
            sentimiento = TextBlob(translated).sentiment
        except Exception as e:
            sentimiento = 0.0

        output.append({
            'Tweet_No': str(i+1),
            'Date': str(tweet.date),
            'ID': tweet.id,
            'Content': tweet.content,
            'Username': tweet.username,
            'Sentiment': round(sentimiento.polarity, 2)
        })

    return json.dumps(output, indent=3)

    # Alternatively we can use system commands to obtain a .jsonl file
    # os.system('snscrape --jsonl --max-results {} twitter-search \"{}\" > tweets.json'.format(num_tweets, words))

""" print(scrape('#Granada -filter:retweets', 20))
print(sns(b'#Fondales OR (#Fondales#Granada) -filter:retweets', 20)) """