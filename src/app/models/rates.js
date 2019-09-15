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
    gett: function(base, curr, from, to){
        return this.find()
            .where('date').gte(from).lte(to)
            .select('date ' + base + ' ' + curr)
            .sort('date')
            .lean()
            .exec()
    }
}

module.exports = mongoose.model('rates', ratesSchema);