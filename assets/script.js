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
    //    wind
    var currWind = document.createElement('h2');
    currWind.textContent = 'Wind: ' + wind + ' MPH';
    //    humidity
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
        
        forecast.textContent = '';

        for (var i = 0; i < 40; i += 8) {

            var trueDate = new Date(data.list[i].dt * 1000);

            var futureDays = document.createElement('div');
            futureDays.className = 'col';
            futureDays.setAttribute('style', 'border-style: solid')

            var futureDate = document.createElement('h2');
            futureDate.textContent = trueDate.toLocaleDateString("en-US");

            var futureIcon = document.createElement('img');
            futureIcon.setAttribute('src', 'https://openweathermap.org/img/wn/' + data.list[i].weather[0].icon + '.png');

            var futureTemp = document.createElement('h2');
            futureTemp.textContent = 'Temp: ' + data.list[i].main.temp + '°F';

            var futureWind = document.createElement('h2');
            futureWind.textContent = 'Wind: ' + data.list[i].wind.speed + ' MPH';

            var futureHumidity = document.createElement('h2');
            futureHumidity.textContent = 'Humidity: ' + data.list[i].main.humidity + ' %'

            forecast.appendChild(futureDays);
            futureDays.append(futureDate, futureIcon, futureTemp, futureWind, futureHumidity);


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
    cityButton.className = 'btn btn-primary btn-lg btn-block col-12 my-1'
    if (pastCities.textContent.includes(cityName)) {
    } else {
        cityButton.setAttribute('id', cityName);
        pastCities.appendChild(cityButton);
    }

    // for tomorrow----- use id tag(cityname) as event listener on button in pastcities field to reinit search!

    var getCoordinates = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=1&appid=226011e8e963e4a2251a03649b5adc44'

    fetch(getCoordinates)
    .then(function (response) {
        return response.json();
      })
      .then(function (data) {
          getWeather(data[0].lat, data[0].lon);
          getForecast(data[0].lat, data[0].lon);
          var rePop = {
            lat: data[0].lat,
            lon: data[0].lon
          };
          localStorage.setItem(cityName, JSON.stringify(rePop));
        })
    .catch(function (error) {
        console.log(error);
    })
}

button.addEventListener('click', gatherCoords);


