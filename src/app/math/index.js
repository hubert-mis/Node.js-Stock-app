const jerzy = require('jerzy');
const stats = require('simple-statistics');


shapiro = function(vector){
    if(vector.length < 8) return "Zbyt mało obserwacji";
    var rates = [];
    for (let i = 1; i < vector.length; i++) {
        rates.push((vector[i]-vector[i-1])/vector[i-1])        
    }
    //console.log(rates);
    return jerzy.Normality.shapiroWilk(new jerzy.Vector(rates)).p;
}


exports.fun1 = function(data, cur){
    var vector = data.map(a => a[cur]);
    console.log(vector);
    return fun2(vector);
}


fun2 = function(vector1){
    var res = {};
    //var vector = [ 4.36909999997893,
    //    4.366300000019435,
    //    4.339499999883264,
    //    4.339900000093142,
    //    4.339400000031626,
    ///    4.333500000001159,
    ///    4.333900000267764,
    //   4.333500000028828,
    //    4.330400000222329,
    //    4.32479999998988 ];

    res['shapiro'] = shapiro(vector);
    res['min'] = stats.min(vector);
    res['q1'] = stats.quantile(vector, 0.25);
    res['mean'] = stats.mean(vector);
    res['median'] = stats.median(vector);
    res['q3'] = stats.quantile(vector, 0.75);
    res['max'] = stats.max(vector);
    res['sd'] = stats.standardDeviation(vector);

    return res;
}