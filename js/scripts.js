(function() {

  function getWeatherFromIp() {
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
    var units = "&units=metric";
    var requestUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + locationData.city + "," + locationData.country + units + "&appid=74ab00f9f5d6f488185edff7e764b725";
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
    document.getElementById('weather-city').innerHTML = currentWeather.name + ", " + currentWeather.sys.country;
    document.getElementById('weather-temp').innerHTML = Math.round(currentWeather.main.temp) + "°C";
    document.getElementById('weather-description').innerHTML = currentWeather.weather[0].main;
    document.getElementById('weather-icon').innerHTML = getIconString(currentWeather.weather[0].id);
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
