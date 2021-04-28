// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  sentiment_url:'http://127.0.0.1:5000/sentimiento',
  login_url:'http://localhost:8000/login',
  register_url: 'http://localhost:8000/register',
  tripadvisor_scrapper_url: 'http://localhost:5000/tripadvisor',
  tripadvisor_api_url: 'http://localhost:8000/scrapers/tripadvisor'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
