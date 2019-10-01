'use strict';

// put your own value below!
const apiKey = 'cMpIORamIDkLhzAYLDnVIdcJzHAvd7e4Bzzsx9fM'; 
const searchURL = 'https://developer.nps.gov/api/v1/parks';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}


function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){

    $('#results-list').append(
      `<li><h3>${responseJson.data[i].fullName}</h3>
      <p>${responseJson.data[i].description}</p>
      <a class ='links' href ='${responseJson.data[i].url}'>Website</a><a class= 'links' href = '${responseJson.data[i].directionsUrl}'>Directions</a>
      </li>`)};
  //display the results section  
  $('#results').removeClass('hidden');
};



function getParks(query, maxResults=10) {
   const params = {
    stateCode: query,
    limit: maxResults,
    api_key: apiKey
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;
  console.log(url);

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
     $('#js-error-message').text(`Something went wrong: ${err.message}`);
        
    });
    
}



function watchForm() {
  
  $('form').submit(event => {
    event.preventDefault();
    let query = $('#js-search-term').val();
    let maxResults = $('#js-max-results').val();
    getParks(query, maxResults);
  });
}

$(watchForm);