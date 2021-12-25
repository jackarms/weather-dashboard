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
      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          let tempVal = data.main.temp;
          let humidityVal = data.main.humidity;
          let windSpeedVal = data.wind.speed;

          let date = new Date();
          let day = date.getDate();
          let month = date.getMonth() + 1;
          let year = date.getFullYear();

          let fullDate = `${day}.${month}.${year}.`;
          console.log(fullDate);
          $("#city-name").append(citySearchValue + " " + "(" + fullDate + ")");
          $("#temp").append(" " + tempVal + "°F");
          $("#wind").append(" " + windSpeedVal + "MPH");
          $("#humidity").append(" " + humidityVal + "%");

          let lat = data.coord.lat;
          let lon = data.coord.lon;

          uvUrl =
            "https://api.openweathermap.org/data/2.5/onecall?lat=" +
            lat +
            "&lon=" +
            lon +
            "&appid=3727e6df52e0ca7f0482d054586ff709&units=imperial";

          fetch(uvUrl)
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              let uvVal = data.current.uvi;
              $("#uv").append(" " + uvVal);
              let theData = data.daily.slice(0, 5);
              console.log(theData);
            });
          });
    };
    getCityWeather();
  });
});

$(document).ready(function () {
  $("#searchBtn").click(function () {
    async function showForecast() {
      let city2 =  $("input").val();
      console.log(city2)
      forecastResponse = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=" + city2 + "&appid=3727e6df52e0ca7f0482d054586ff709&units=imperial")
      weatherForecast = await forecastResponse.json();
      let lat = weatherForecast.city.coord.lat
      let lon = weatherForecast.city.coord.lon

      secondForecastResponse = await fetch("https://api.openweathermap.org/data/2.5/onecall?lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=3727e6df52e0ca7f0482d054586ff709&units=imperial")
      secondWeatherForecast = await secondForecastResponse.json();
      console.log(secondWeatherForecast)
      theDays = secondWeatherForecast.daily
      var removed = theDays.splice(5,3)
      length = 5
      for(let i =0; i < theDays.length; i++) {
        let timeStamp = theDays[i].dt 
        let date = new Date(timeStamp * 1000)
        let myDate = date.toLocaleDateString("en-US")
        
        let dayTemp = theDays[i].temp.day
        let dayHumidity = theDays[i].humidity
        let dayWind = theDays[i].wind_speed
        $("#theDay").append($('<ul><li>' + myDate + '</li>' + '<li>' + "Temp: " + dayTemp + "°F" + '</li><li>' + "Humidity: " + dayHumidity + "%" + '</li><li>' + "Wind: " + dayWind + "MPH" + '</li></ul>'))

      }
      
    }
    showForecast();
  })
})

$(document).ready(function () {
  $("#searchBtn").click(function () {
    var searchText = $("input").val();
    var searchHistory = localStorage.setItem('searchInput',searchText)
    function getHistory () {
    let history = localStorage.getItem('searchInput')
    console.log(history) 
    $('#search-results').append($('<p>' + history + '</p>'))
  }
  getHistory()
  })
})