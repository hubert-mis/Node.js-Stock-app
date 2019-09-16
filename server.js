const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

//port number and db url
const config = require('./src/config/config');

//create new express app
var app = express();

require('./src/app/models/rates');
require('./src/app/models/schedule');

//app routing in external file
require('./src/config/routes')(app);

//serve static and set views folder
app.use(express.static(path.join(__dirname, '/src/public')));
app.set('views', path.join(__dirname, '/src/app/views'));


//connect to database, and once succeded start listening
server();

function server() {
  mongoose.connection
  .on('error', console.log)
  .on('disconnected', server)
  .once('open', function(){
    app.listen(config.port, function(){
      console.log("App running on port: " + config.port);
      //cron.start();
      //test5("EUR", "PLN");
    })
  });

  return mongoose.connect(config.db, { useNewUrlParser: true });
}