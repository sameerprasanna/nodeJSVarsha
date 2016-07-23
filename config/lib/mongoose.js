/**
 * Created by varsha on 7/17/2016.
 */


'use strict';

//module dependencies
var config = require('../config'),
    mongoose = require('mongoose'),
    path = require('path'),
    user = require(path.join(process.cwd(),'modules/core/server/models/contact.server.model'));

module.exports.connect = function (callback){
    
   var db = mongoose.connect(config.db.uri, config.db.options, function(err){
        if(err){
            console.log("ERROR:could not connect to mongodb");
            console.log(err);
        }
        else{
            if(callback) callback(db);
            
        }
    });
}