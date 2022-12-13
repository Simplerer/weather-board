var searchInput = document.querySelector("#city");
var button = document.getElementById("button");



var getWeather = function (lat, lon) {
    
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=226011e8e963e4a2251a03649b5adc44&units=imperial';

    console.log(requestUrl);

    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data) 
    })
    .catch(function (error) {
        console.log(error);
    })

    

}

var gatherCoords = function(event) {
    event.preventDefault();
    
    var cityName = searchInput.value.trim();

    var getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=226011e8e963e4a2251a03649b5adc44'

    fetch(getCoordinates)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          for (var i = 0; i < data.length; i++){
            
              getWeather(data[i].lat, data[i].lon);

            }

        })
    .catch(function (error) {
        console.log(error);
    })
}

button.addEventListener('click', gatherCoords);

// API key = 226011e8e963e4a2251a03649b5adc44
// ---------------------------------------------this is for getting lat and lon-------------------
// http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}


// ------------------------------------------this is for weather -----------------------------------

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
