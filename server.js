'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');
var Url = require('./models/urls');
var dns = require('dns');

var app = express();

// Basic Configuration 
var port = process.env.PORT || 3000;

/** this project needs a db !! **/ 
// mongoose.connect(process.env.MONGOLAB_URI);
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());

/** this project needs to parse POST bodies **/

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});

  
// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.post("/api/shorturl/new", function(req, res, next){
  let input = req.body.url;
  let insertId = "";
  
  
  dns.lookup(input.split("//")[1], function(err, address, data){
    if(err) {
      res.json({"error":"invalid URL"});ss
      
    }
    console.log(address);
  })
  
  let urlObject = Url.findByType("url", function(err, data){
    if(err) console.log(err);
      if(data.length === 0){
        Url.insertUrlAndId(input, 1, function(err, data){
          if(err) console.log(err);
          res.json(data);
        });
      } else {
        insertId = data.id;
        Url.findByName(input, function(err, data){
          if(err) console.log(err);
          
        })
        console.log();
        Url.insertUrlAndId(input, data[0].id + 1, function(err, data){
          if(err) console.log(err);
          res.json(data);
        })
      }
  });
  console.log(urlObject);
});

 app.get("/api/shorturl/:id", function(req, res){
     let id = req.params.id;
     Url.findUrlById(id, function(err, data){
       if(err) console.log(err);
        res.redirect(data.url);
     })
 });



app.listen(port, function () {
  console.log('Node.js listening ...');
});