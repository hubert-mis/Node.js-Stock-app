var controllers = require('../app/controllers/cont');


module.exports = function(app) {
    app.get('/', function(req, res){
        res.render('main.ejs')
    })
    app.get('/tt/:currency', controllers.fun2)
    //app.get('/upl', cont.upload)

    app.get('/a/:currency', controllers.chooseBase)
};