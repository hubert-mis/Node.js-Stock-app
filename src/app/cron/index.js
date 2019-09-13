const mongoose = require('mongoose');
const cron = require('node-cron');

const schedule = require('../models/schedule');
const upload = require('../upload');
const startDate = require('../../config/config').startDate;


autoActualize = function(){
    schedule.findOne()
    .select('lastUpdate')
    .exec(function(err, res){
        if (err) console.log(err);
        else if (res == null){
            var x = new schedule();
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            
            try {
                upload.upload(startDate, date);
                x.lastUpdate = date;
                x.save();
            } catch (error) {
                console.log(error)
            }
        }
        else{
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var last = res.lastUpdate;
            try {
                upload.upload(last, date);
                res.lastUpdate = date;
                res.save();
            } catch (error) {
                console.log(error)
            }
        }
    })
}

module.exports.start = function(){
    cron.schedule('0 30 22 * * *', () => {
        autoActualize();
    })
}

//module.exports.xd = autoActualize;