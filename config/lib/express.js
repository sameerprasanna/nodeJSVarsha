/**
 * Created by varsha on 7/10/2016.
 */
'use strict';

var express = require('express');// 3rd party library
var bodyParser = require('body-parser'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    config = require('../config'),
    path = require('path');

//to interface this module with the other modules use export.init
module.exports.init = function(){
    var app = express();
    
    //integrating body parser middleware
    this.initBodyParser(app);
    this.initViewEngine(app);
    this.initIgnoreStaticRoutes(app);
    return app;

};

// app is express object
module.exports.initBodyParser = function(app){
    //parse application to get the body of the request object
    app.use(bodyParser.urlencoded({extended:false}));
    app.use(bodyParser.json());

};


module.exports.initViewEngine = function(app){

    app.engine('server.view.html', consolidate['swig']);
    app.set('view engine', 'server.view.html' );
    app.set('views',path.join(process.cwd(),'/modules/core/server/views/'));
}

module.exports.initIgnoreStaticRoutes = function(app){

    app.use('/public',express.static(path.resolve('./public')));
 //   app.use('/modules/core/client/app/config.js',express.static(path.resolve('/modules/core/client/app/config.js')));
    
    config.client.files.forEach(function(staticPath){
        
        app.use(staticPath,express.static(path.resolve('./'+staticPath)));
    }
    
    
    )
}