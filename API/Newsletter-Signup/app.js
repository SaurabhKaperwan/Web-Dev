const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const https = require("https");

const app = express();

//To use static files like css and images
//Move all files in public folder
//location will be relative to public folder in href
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);
    const url = "https://us17.api.mailchimp.com/3.0/lists/5dae4eaf9a";

    const options = {
            method: "POST",
            auth: "saurabh:90ff44ba2f51a2b7473f4ee7519fd14c-us17"
    }

    const request = https.request(url, options, function(response) {

        if(response.statusCode === 200) {
            res.sendFile(__dirname + "/success.html")
        }
        else {
            res.sendFile(__dirname + "/failure.html");
        }
        response.on("data", function(data) {
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});

app.post("/failure", function(req, res) {
    res.redirect("/");
});

app.listen(3001, function() {
    console.log("Server is running on port 3001");
});

//api key = 90ff44ba2f51a2b7473f4ee7519fd14c-us17

//audience or list id = 5dae4eaf9a
