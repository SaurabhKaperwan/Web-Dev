const express = require("express");
const bodyParser = require("express");
let ejs = require("ejs");

const app = express();

app.set("view engine", 'ejs');

app.get("/", function(req, res) {
    var today = new Date();
    var currentDay = today.getDay();
    var day = "";

    if(currentDay === 6 || currentDay === 0) {
        day = "weekend";
        //key value pair
        res.render("list", {kindOfDay: day});
    }
    else {
        day = "weekday";
        res.render("list", {kindOfDay: day});
    }
});

app.listen(3000, function() {
    console.log("Server running on port 3000");
});
