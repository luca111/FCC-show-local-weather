// NB: not using Open Weather due to new Chrome restrictions.

$(document).ready(function(){

  var tempC = undefined;
  var tempF = undefined;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var lat = position.coords.latitude;
      var lon = position.coords.longitude;

      // changed the following line due to new restrictions on Chrome for using geolocalization with unsecured connections:
      //var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + given;

      var url = "https://api.wunderground.com/api/[KEY]/conditions/q/" + lat + "," + lon +".json";

      $.getJSON(url, function(json) {
        console.log(json);
        tempC = json.current_observation.temp_c;
        tempF = json.current_observation.temp_f;
        var weather = json.current_observation.weather;
        var city = json.current_observation.display_location.city;
        var weatherIcon = json.current_observation.icon_url;

        $("#locationDisplay").html("<h3>" + city + "</h3>");

        $("#weatherDisplay").html("<h3>" + weather + "</h3>");

        $("#temperature").html("<h3 class='temp'>" + tempC + " °C</h3>" + "<h3 class='temp' style='display: none'>" + tempF + " °F</h3><button id='toggleButton' class='btn btn-default'>Toggle between Fahrenheit/Celsius</button>");

        $("button").click(function() {
          $(".temp").toggle();
        });

        $("#icon-div").html("<img src='" + weatherIcon + "' alt='Weather image'>");

      });
      /*$("#positionDiv").html("latitude: " + position.coords.latitude + "<br>longitude : " + position.coords.longitude);*/
    });
  };

});
