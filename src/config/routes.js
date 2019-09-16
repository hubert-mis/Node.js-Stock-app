var controllers = require('../app/controllers/controllers');


module.exports = function(app) {
    app.get('/', controllers.main)
    
    app.get('/a', controllers.chooseBase)

    app.get('/a/:base', controllers.chooseCurr)

    app.get('/a/:base/:curr', controllers.chooseRange)

    app.get('/b/:base/:curr', controllers.showData)
};