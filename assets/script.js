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

              for (let i = 0; i < theData.length; i++) {
                let dailyTemp = theData[i].temp.day;
                console.log(dailyTemp);
                let dailyWind = theData[i].wind_speed;
                console.log(dailyWind);
                let dailyHumidity = theData[i].humidity;
                console.log(dailyHumidity);

                $("#theDay").append(dailyTemp);
              }
            });
        });
    };
    getCityWeather();
  });
});
