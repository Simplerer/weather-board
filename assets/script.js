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

// Need to extract icon, date, city name, temp, humidity, and wind speed

}

var gatherCoords = function(event) {
    event.preventDefault();
    
    var cityName = searchInput.value.trim();
    localStorage.setItem('cityname', cityName);

    var getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=226011e8e963e4a2251a03649b5adc44'

    fetch(getCoordinates)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          console.log(data);
          getWeather(data[0].lat, data[0].lon)

        })
    .catch(function (error) {
        console.log(error);
    })
}

button.addEventListener('click', gatherCoords);

// to maybe get weather icon
//----------- var icon = weather[0].icon      ------    someone had a.weather[0].icon?
//=---------iconurl = 'http://openweathermap.org/img/wn/10d.png  ..?    10d is code
//  ---------------so 'http://openweathermap.org/img/wn/ + icon + .png'
 //          createAttribute src as the link
