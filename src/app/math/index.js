const jerzy = require('jerzy');
const stats = require('simple-statistics');


shapiro = function(vector){
    if(vector.length < 8) return "Zbyt mało obserwacji";
    var rates = [];
    for (let i = 1; i < vector.length; i++) {
        rates.push((vector[i]-vector[i-1])/vector[i-1])        
    }
    return jerzy.Normality.shapiroWilk(new jerzy.Vector(rates)).p;
}


exports.fun1 = function(data, cur){
    var vector = data.map(a => a[cur]);
    return fun2(vector);
}


fun2 = function(vector){
    var res = {};

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