const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cron = require('./src/app/cron');

//port number and db url
const config = require('./src/config/config');

//create new express app
var app = express();


const rates = require('./src/app/models/rates');
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


function test5(base, cc){
  
  rates.gett('2019-09-05', '2019-09-15', base, cc)
    .then(function(res){
      var xd = [];
      for (let i = 0; i < res.length; i++) {
        var t = {};
        t['date'] = res[i]['date'];
        t[cc] = res[i][cc] / res[i][base];
        xd.push(t);        
      }
      console.log(xd);
    })  
}
