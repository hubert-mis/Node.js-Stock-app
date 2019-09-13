const mongoose = require('mongoose');
const rates = require('../models/rates')
const request = require('request');

function upload(from, to){
  var url = "https://api.exchangeratesapi.io/history?start_at=" + from + "&end_at=" + to + "&base=USD";
  request.get(url, function(err, resp, body){
    if(!err && resp.statusCode == 200){
      var x = JSON.parse(body);
      var y = x["rates"];

      for(var key in y){
        if(y.hasOwnProperty(key)) {
          new rates({
            date: key,
            PHP: y[key]["PHP"],
            CZK: y[key]["CZK"],
            BRL: y[key]["BRL"],
            CHF: y[key]["CHF"],
            INR: y[key]["INR"],
            ISK: y[key]["ISK"],
            HRK: y[key]["HRK"],
            PLN: y[key]["PLN"],
            NOK: y[key]["NOK"],
            USD: y[key]["USD"],
            CNY: y[key]["CNY"],
            RUB: y[key]["RUB"],
            SEK: y[key]["SEK"],
            MYR: y[key]["MYR"],
            SGD: y[key]["SGD"],
            ILS: y[key]["ILS"],
            TRY: y[key]["TRY"],
            BGN: y[key]["BGN"],
            NZD: y[key]["NZD"],
            HKD: y[key]["HKD"],
            RON: y[key]["RON"],
            EUR: y[key]["EUR"],
            MXN: y[key]["MXN"],
            CAD: y[key]["CAD"],
            AUD: y[key]["AUD"],
            GBP: y[key]["GBP"],
            KRW: y[key]["KRW"],
            IDR: y[key]["IDR"],
            JPY: y[key]["JPY"],
            DKK: y[key]["DKK"],
            ZAR: y[key]["ZAR"],
            HUF: y[key]["HUF"]
          }).save()
          .then(doc => {
            console.log(doc)
            })
          .catch(err => {
            console.error(err)
          })
        }
      }
    }
  })
}

module.exports.upload = upload;