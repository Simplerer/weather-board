var searchInput = document.querySelector("#city");
var button = document.getElementById("button");
var currentDay = document.getElementById("currentday");
var pastCities = document.getElementById('past-cities');
var forecast = document.getElementById('forecast');


var weatherToday = function (city, date, icon, temp, wind, humidity) {

    currentDay.textContent = "";
    
    var trueDate = new Date(date * 1000);
    //   container for city info
    var currCityBox = document.createElement('div');
    currCityBox.className = 'col-12 p-5 m-4';
    //   title of card
    var currCity = document.createElement('h1');
    currCity.textContent = city + ' ' + trueDate.toLocaleDateString("en-US");
    //    icon
    var currIcon = document.createElement('img');
    currIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + icon + '.png');
    //   temp
    var currTemp = document.createElement('h2');
    currTemp.textContent = 'Temp: ' + temp + '°F';
    
    var currWind = document.createElement('h2');
    currWind.textContent = 'Wind: ' + wind + ' MPH';
    
    var currHumidity = document.createElement('h2');
    currHumidity.textContent = 'Humidity: ' + humidity + ' %';
    
    currentDay.appendChild(currCityBox);
    currCityBox.append(currCity, currIcon, currTemp, currWind, currHumidity);
    
    
}
var getWeather = function (lat, lon) {
    
    var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=226011e8e963e4a2251a03649b5adc44&units=imperial';
    
    fetch(requestUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        weatherToday(data.name, data.dt, data.weather[0].icon, data.main.temp, data.wind.speed, data.main.humidity);
    })
    .catch(function (error) {
        console.log(error);
        
    })  
        
}

var getForecast = function(lat, lon) {

    var forecastURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=226011e8e963e4a2251a03649b5adc44&units=imperial';

    fetch(forecastURL)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        for (var i = 0; i < 40; i += 8) {
            console.log(data.list[i].dt)
//     -------------- date, icon, temp, wind, humidity
            var futureDays = document.createElement('div');
            futureDays.className = 'col-12 p-5';

            var futureDate = document.createElement('h')






        }

    })
    .catch(function (error) {
        console.log(error);
        
    })
}

var gatherCoords = function(event) {
    event.preventDefault();
    
    var cityName = searchInput.value.trim();

    var cityButton = document.createElement('button');
    cityButton.textContent = cityName;
    cityButton.className = 'btn btn-primary btn-lg btn-block'
    pastCities.appendChild(cityButton);

    var getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=226011e8e963e4a2251a03649b5adc44'

    fetch(getCoordinates)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          getWeather(data[0].lat, data[0].lon);
          getForecast(data[0].lat, data[0].lon);
          localStorage.setItem(cityName, cityName);
        })
    .catch(function (error) {
        console.log(error);
    })
}

button.addEventListener('click', gatherCoords);

