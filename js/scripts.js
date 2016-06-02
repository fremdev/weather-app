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

  getWeatherFromIp();
})();
