
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
      res.sendFile(__dirname + "/index.html");
})

app.post("/",function(req,res){


    const query = req.body.city;
    const apikey = "your-api";

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apikey;

    https.get(url,function(responce){
    

        responce.on("data",function(data){
            const weatherdata = JSON.parse(data);
            const temp = weatherdata.main.temp;
            const tempdes = weatherdata.weather[0].description;

            res.write("<h1>the temprature in " + query +" is " + (temp-273) +" degree celcious</h1><br>" );
            res.write("the weather description is " + tempdes);
            res.send();
        })

    })


})

app.listen(3000,function(){
    console.log("server is running");
})
