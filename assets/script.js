var citySearch = $("input").text();

//console.log(citySearch);
$(document).ready(function () {
  $("#searchBtn").click(function () {
    var citySearchText = $("input").text();
    var citySearchValue = $("input").val();

    var getCityWeather = function () {
      let city = localStorage.getItem();
      console.log(city);
      let apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=3727e6df52e0ca7f0482d054586ff709";
      fetch(apiUrl);
    };
    getCityWeather();
  });
});

//var searchHistory = function (cityName) {
//var returnValue = localStorage.getItem(citySearchValue);
// $("#searcResults").after(returnValue);
//};
//searchHistory();

//function fetchCall(value) {}
