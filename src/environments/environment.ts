// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  login_url: 'http://localhost:8000/auth/login',
  register_url: 'http://localhost:8000/auth/register',
  add_search_url: 'http://localhost:8000/addSearch',
  municipios_url: 'http://localhost:8000/municipios',
  top_searches_url: 'http://localhost:8000/mostSearchedMunicipios',
  all_users_url: 'http://localhost:8000/users',
  reset_ccaa_provincias_municipios_url: 'http://localhost:8000/resetCcaaProvinciasMunicipios',
  highlighted_municipios_url: 'http://localhost:8000/highlightedMunicipios',
  municipios_with_highlighted_url: 'http://localhost:8000/municipiosWithHighlighted',
  update_highlighted_url: 'http://localhost:8000/updateHighlighted',
  sentiment_url: 'http://localhost:5000/sentimiento',
  tripadvisor_scrapper_url: 'http://localhost:5000/scrapers/tripadvisor/v1',
  tripadvisor_scrapper_url_v2: 'http://localhost:5000/scrapers/tripadvisor/v2',
  twitter_scrapper_url: 'http://localhost:5000/scrapers/twitter/sns',
  tiempo_scrapper_url: 'http://localhost:5000/scrapers/tiempo',
  wiki_scrapper_url: 'http://localhost:5000/scrapers/wiki',
  model_url: 'http://localhost:5000/model/prediction',
  update_search_url: 'http://localhost:8000/updateSearch'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
