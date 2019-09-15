const rates = require('../models/rates');
const upl = require('../upload');
const cron = require('../cron');

var curs = ["USD", "EUR", "PLN", "GBP", "CHF", "CNY"];

exports.upload = function(req, res){
    cron.xd();
    res.end("up");
}

exports.main = function(req, res){
    res.render('main.ejs');
}

exports.chooseBase = function(req, res){
    res.render('chooseBase.ejs');
}

exports.chooseCurr = function(req, res){
    var base = req.params.base;
    var curr = curs.filter(function(val){
        return val != base;
    })

    res.render('chooseCurr.ejs', {
        base: base,
        curr: curr
    });
}

exports.fun3 = function(req, res){
    base = req.params.base;
    curr = req.params.curr;
    from = req.query.from;
    to = req.query.to;

    rates.gett(base, curr, from, to)
        .then(function(doc){
            var xd = [];
            for (let i = 0; i < doc.length; i++) {
              var obj = doc[i];
              var t = {};
              t['date'] = obj['date'];
              t[curr] = obj[curr] / obj[base];
              xd.push(t);        
            }
            res.json(xd);
        })  
}