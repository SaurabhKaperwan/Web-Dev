const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
require('dotenv').config();
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res) {
    const query = req.body.cityName;
    const unit = "metric";
    const apiKey = process.env.API_KEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

    https.get(url, function(response) {

        console.log(response.statusCode);

        response.on("data", function(data) {
            //data is in hex decimal or JSON
            const weatherData = JSON.parse(data);

            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1>Temperature in " + query + " : " + temp + " degres Celcius</h1>");
            res.write("<p>Weather description "+ weatherDescription+ "</p>")
            res.write("<img src=" + imageURL +" />");
            res.send();
        })
    });
})


app.listen(3001, function() {
    console.log("Server is running");
})
