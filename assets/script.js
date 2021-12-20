$(document).ready(function () {
  $("#searchBtn").click(function () {
    var citySearchText = $("input").text();
    var citySearchValue = $("input").val();
    localStorage.setItem(citySearchText, citySearchValue);

    var getCityWeather = function () {
      let city = localStorage.getItem(citySearchText);
      console.log(city);
      let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=3727e6df52e0ca7f0482d054586ff709&units=imperial";
      async function loadWeather() {
        const response = await fetch(apiUrl);
        const weather = await response.json();
        theWeather = JSON.parse(weather);
        temp = theWeather["temp"];
        console.log(temp);
      }
      loadWeather();
    };
    getCityWeather();
  });
});
