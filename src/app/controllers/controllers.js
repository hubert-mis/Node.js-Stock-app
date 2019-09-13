const rates = require('../models/rates');
const upl = require('../upload');
const cron = require('../cron');

exports.fun3 = function (req, res){
    var d = new Date("2019-03-05");
    rates.find({
        date: {
            $gte: new Date(2018, 03, 20)
        }},
        'EUR',
        function(err, res){
            console.log(res);
        }
    )
    res.end('ABC');
}

exports.fun = function (req, res){
    var d = new Date(2018, 07, 20)
    var c = 'USD'

    rates.find().where('date').gte(d).select(c).
    exec(function(err, res){
        console.log(res);
    })
    res.end('proba'); 
}


exports.fun2 = function(req, res){
    var d = req.query.date;
    var c = req.params.currency;
    var xd = {};
    xd['conditions'] = {};
    xd['conditions']['date'] = d;
    xd['projection'] = c;
    xd['callback'] = function(err, res){
        console.log(res);
    };
    console.log(xd);

    rates.find(xd)
    res.end('VV');
    
}

exports.upload = function(req, res){
    cron.xd();
    res.end("up");
}

exports.chooseBase = function(req, res){
    res.render('chooseBase.ejs');
}