
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {

 res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const city = req.body.cityName;
  const keyid = "157ba5b046c93dd078ec3e90457c90db";
  const unit = "metric";

  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid="+ keyid +"&units=" + unit;
  https.get(url, function(response) {

    response.on("data", function(data) {
      const weatherData = JSON.parse(data)
      const temp = weatherData.main.temp;
      const weatherDesc = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      res.write("<p>The weather is currently " + weatherDesc + ".</p>");
      res.write("<h1>The temperature in " + city + " is " + temp + " degrees celcius.</h1>");
      const url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
      res.write("<img src = " + url + ">");
      res.send();
    })
  });

})



app.listen(3000, function() {
  console.log("Server is running on port 3000.");
});
