const bodyParser = require("body-parser");
const express = require("express");
const request = require("request");
const app = express();

app.listen(3001, function() {
    console.log("Server is running on port 3001");
})
