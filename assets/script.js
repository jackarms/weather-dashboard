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

              $.each(theData, function (key, value) {
                let date = new Date(this.dt).toLocaleDateString("en-US");
                inputData = [
                  "Humidity:" + value.humidity + "%",
                  "Windspeed:" + value.wind_speed + "MPH",
                  "Temperature:" + value.temp.day + "°F",
                ];
                $.each(inputData, function (index, value) {
                  console.log(index);
                });
              });
            });
        });
    };
    getCityWeather();
  });
});
