(function() {

  function getWeatherFromIp() {
    if (window.location.protocol === 'https:') {
      document.getElementById('weather-widget').insertAdjacentHTML('afterbegin',
    '<div class="error"><h3>Error!</h3>You\'re on the https protocol page. Current API works only with http protocol. Use http protocol please - you can see an example of working version <a href="http://codepen.io/fremdev/pen/JKdyjG" target="_blank">here</a>. Sorry for inconvenience.</div>');
    }
    var requestIpData = new XMLHttpRequest();
    requestIpData.open('GET', 'http://ip-api.com/json', true);

    requestIpData.onload = function() {
      if (requestIpData.status >= 200 && requestIpData.status < 400) {
        var dataFromIp = JSON.parse(requestIpData.responseText);
        getWeather(dataFromIp);
      }
    }
    requestIpData.send();
  }

  function getWeather(locationData) {
    var requestUrl = 'http://api.openweathermap.org/data/2.5/weather?q=' + locationData.city + "," + locationData.country + '&units=metric&appid=74ab00f9f5d6f488185edff7e764b725';
    var requestWeather = new XMLHttpRequest();
    requestWeather.open('GET', requestUrl, true);

    requestWeather.onload = function() {
      if (requestWeather.status >= 200 && requestWeather.status < 400) {
        var currentWeather = JSON.parse(requestWeather.responseText);
        renderPage(currentWeather);
      }
    }
    requestWeather.send();
  }

  function renderPage(currentWeather) {
    var convertButton = document.getElementById('convert');
    var weatherTemp = document.getElementById('weather-temp');
    var windSpeed = document.getElementById('wind-speed');
    var windMetersSec = Math.round(currentWeather.wind.speed);
    var windMilesHour = Math.round(currentWeather.wind.speed / 0.44704);
    var metric = true;
    var tempCelsius = Math.round(currentWeather.main.temp);
    var tempFahrenheit = Math.round(currentWeather.main.temp * 9/5 + 32);
    document.getElementById('weather-city').innerHTML = currentWeather.name + ", " + currentWeather.sys.country;
    weatherTemp.innerHTML = tempCelsius + '°C';
    document.getElementById('weather-description').innerHTML = currentWeather.weather[0].main;
    document.getElementById('weather-icon').innerHTML = getIconString(currentWeather.weather[0].id);
    windSpeed.innerHTML = windMetersSec + ' m/s';
    document.getElementById('wind-icon').innerHTML = '<i class="wi wi-wind from-' + currentWeather.wind.deg + '-deg"></i>';
    document.getElementById('clothes').innerHTML = '<img class="img-responsive" src="' + getClothesImage(tempCelsius) + '" alt="Clothes for wearing at ' + tempCelsius + ' Celsius">';
    convertButton.addEventListener('click', function() {
      if (metric === true) {
        weatherTemp.innerHTML = tempFahrenheit + '°F';
        windSpeed.innerHTML = windMilesHour + ' mph'
        convertButton.textContent = 'To Metric';
        metric = false;
      }
      else {
        weatherTemp.innerHTML = tempCelsius + '°C';
        windSpeed.innerHTML = windMetersSec + ' m/s';
        convertButton.textContent = 'To Imperial';
        metric = true;
      }
    });
  }

  function getIconString(weatherId) {
    var iconString = '<i class="wi wi-owm-';
    var date = new Date();
    var currentHours = date.getHours();
    if (currentHours > 21 || currentHours < 6) {
      iconString += "night-";
    }
    else {
      iconString += "day-";
    }
    iconString += weatherId + '"></i>';
    return iconString;
  }

  function getClothesImage(tempC) {
    var imageUrl = '';
    var clothesByTemp = {
      0: './img/0.jpg',
      5: './img/5.jpg',
      10: './img/10.jpg',
      15: './img/15.jpg',
      20: './img/20.jpg',
      30: './img/30.jpg',
    };
    if (tempC <= 0) {
      imageUrl = clothesByTemp[0];
    }
    else if (tempC < 6) {
      imageUrl = clothesByTemp[5];
    }
    else if (tempC < 11) {
      imageUrl = clothesByTemp[10];
    }
    else if (tempC < 21) {
      imageUrl = clothesByTemp[15];
    }
    else if (tempC < 31) {
      imageUrl = clothesByTemp[20];
    }
    else {
      imageUrl = clothesByTemp[30];
    }
    return imageUrl;
  }

  getWeatherFromIp();
})();
