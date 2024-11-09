// Api Key given by account on GeoApify. Limits of its use not currently known
// Will be used to validate our request to GeoApify
GEOAPIFY_KEY = 'ae1c21d7d0f54830910f2fe9d75a5889';

function build_location_request_url(address_string) {
  url_f = 'https://api.geoapify.com/v1/geocode/search?text=';
  query_params = encodeURIComponent(address_string);

  url_f += query_params + '&format=json&apiKey=' + GEOAPIFY_KEY;

  return url_f;
}

export function getLocationManual(street, city, state) {
  full_add = street + ', ' + city + ', ' + state;
  formatted_url = build_location_request_url(full_add);

  /*
    var requestOptions = {
        method: 'GET',
      };
      
      fetch(formatted_url, requestOptions)
        .then(response => response.json())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        */
  return formatted_url;
}
