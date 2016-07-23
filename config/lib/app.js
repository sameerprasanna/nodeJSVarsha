/**
 * Created by varsha on 7/10/2016.
 */

'use strict';
var express = require('./express'), 
    config = require('../config'),
    mongoose = require('./mongoose'),
    path = require('path');

module.exports.loadRoutes = function(app){

  var coreRoute = require(path.join(process.cwd(),'modules/core/server/routes/core.server.routes'));
    coreRoute(app);
};
module.exports.start = function(){
    var self = this;
    //initialize mongodb check if its available
    mongoose.connect(function(db){
        var app = express.init();
        //routes registration
        self.loadRoutes(app);
        app.listen(config.app.port,function(){
            console.log("application is running on port : :" +config.app.port);
        });
    })


}
