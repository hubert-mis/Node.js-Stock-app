const mongoose = require('mongoose');
const request = require('request');
//const url = require('url');
const ratesSchema = new mongoose.Schema({
    date: Date,
    PHP: Number,
    CZK: Number,
    BRL: Number,
    CHF: Number,
    INR: Number,
    ISK: Number,
    HRK: Number,
    PLN: Number,
    NOK: Number,
    USD: Number,
    CNY: Number,
    RUB: Number,
    SEK: Number,
    MYR: Number,
    SGD: Number,
    ILS: Number,
    TRY: Number,
    BGN: Number,
    NZD: Number,
    HKD: Number,
    RON: Number,
    EUR: Number,
    MXN: Number,
    CAD: Number,
    AUD: Number,
    GBP: Number,
    KRW: Number,
    IDR: Number,
    JPY: Number,
    DKK: Number,
    ZAR: Number,
    HUF: Number,
})

ratesSchema.statics = {
    upload: function(from, to){
        var url = "https://api.exchangeratesapi.io/history?start_at=" + from + "&end_at=" + to + "&base=USD";
        request.get(url, function(err, resp, body){
            if(!err && resp.statusCode == 200){
                console.log(body);
                console.log(typeof(body));
                var x = JSON.parse(body);
                console.log(x['base']);
            }
        })
    }
}


ratesSchema.methods = {
    changeBase: function(newB){
        var x = {
            date: this.date,
            PHP: this.PHP/this[newB]
        }
    }
}

module.exports = mongoose.model('rates', ratesSchema);