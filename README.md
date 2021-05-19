# empty-spain-front

Application that analyzes various sources of information (news/reviews etc.) about dying rural towns in Spain and offers the user various functionalities depending on its privileges, aimed to offer a solution in order to stop rural towns dying from lack of population. 

This application uses the Angular framework to implement a user-friendly, rich front-end aided by Bootstrap v5 and various graphic libraries. It follows a Model-View-Controller pattern and uses a web service to authenticate users and registered users or admin specific functionalities, along with various APIs and WebScrappers implemented using Flask and Lumen on the back-end part of the project: https://github.com/riniguez91/empty-spain-back.

Currently the machine learning model (Logistic Regression) has been trained with a dataset of 146 documents obtained through the Pentaho scrapper built, and we decided to use this model based on the performance obtained by it and various others in RapidMiner.

Non-registered user functionalities:
* Public access
* After searching for a town it will show the model prediction for its "Empty Spain" status (depopulated or not) 
* Town services (hotels, restaurants, places to visit) along with its correspondant sentiment analysis

Admin functionalities:
* Protected via user/password
* Can launch various time-consuming WebsScrappers that populate the database amongst other things
* Access to a dashboard that displays web information such as opinions, services
* User privilige modifications

# Authors
* github.com/riniguez91
* github.com/victor00hs
* github.com/rubenoritznieto

PD: Since all of our information is written in Spanish expect some parts that we can't simply write in English, doesn't affect the overall readibility of the code and docs. 

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


