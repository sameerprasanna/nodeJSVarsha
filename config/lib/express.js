/**
 * Created by varsha on 7/10/2016.
 */
'use strict';

var express = require('express');// 3rd party library
var bodyParser = require('body-parser');
//to interface this module with the other modules use export.init
module.exports.init = function(){
    var app = express();
    
    //integrating body parser middleware
    this.initBodyParser(app)
    return app;

};

module.exports.initBodyParser = function(app){
    //parse application to get the body of the request object
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

};