const express = require("express");
const bodyParser = require("body-parser");

const app = express();
//to get the form data in req variable
app.use(bodyParser.urlencoded({extended: true}));

//Get request by browser
//Home Route
app.get("/", function(req, res) {
    //path must be absolute or specify root to res.sendFile()
    //__dirname is constant which gives a current location at any given time
    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res) {
    //convert string to number
    var num1 = Number(req.body.num1);
    var num2 = Number(req.body.num2);

    var result = num1 + num2;

    res.send("Answer:" + result);
});

app.get("/bmi", function(req, res) {
    res.sendFile(__dirname + "/bmiCalculator.html");
});

app.post("/bmi", function(req, res) {
    //convert string to decimal number
    var weight = parseFloat(req.body.weight);
    var height = parseFloat(req.body.height);

    var bmi = weight / (height * height);

    res.send("BMI:" + bmi);
});

//Contact Route
app.get("/contact", function(req, res) {
    res.send("<h1>Contact me at saurabhkaprawan4@gmail.com</h1>");
});

//About Route
app.get("/about", function(req, res) {
    res.send("<h1>Hi I'am Saurabh Kaperwan</h1>");
});


//Port number
app.listen(3001, function() {
    console.log("Server started on port 3001");
});

