const rates = require('../models/rates');
const upl = require('../upload');
const cron = require('../cron');
const math = require('../math');

var curs = ["USD", "EUR", "PLN", "GBP", "CHF", "CNY"];

exports.main = function(req, res){
    res.render('main.ejs');
}

exports.chooseBase = function(req, res){
    res.render('chooseBase.ejs',{
        curr: curs
    });
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

exports.chooseRange = function(req, res){
    res.render('chooseRange.ejs', {
        base: req.params.base,
        curr: req.params.curr
    })
}

exports.showData = function(req, res){
    base = req.params.base;
    curr = req.params.curr;
    from = req.query.from;
    to = req.query.to;

    rates.gett(base, curr, from, to)
    .then(function(doc){
        var vector = [];
        for (let i = 0; i < doc.length; i++) {
          var obj = doc[i];
          var t = [];
          t['date'] = obj['date'];
          t[curr] = obj[curr] / obj[base];
          vector.push(t);        
        }
        var stats = math.fun1(vector, curr);
        res.render('showData.ejs', {
            base: base,
            curr: curr,
            stats: stats
        })
    })  
}



