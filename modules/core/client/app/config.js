/**
 * Created by varsha on 7/29/2016.
 */
'use strict';

//global variable 
var ApplicationConfiguration = (function () {
    
    var _applicationModuleName = 'ContactsApp',
        _applicationDependencies = ['ui.router'];
    
    var _registerModule = function (moduleName, dependencies) {
        //create angular module
        angular.module(_applicationModuleName, dependencies || []);
        
        angular.module(_applicationModuleName).requires.push(moduleName);// to attach the module to the core module 
    }
        return{
            applicationModuleName:_applicationModuleName,
            applicationDependencies:_applicationDependencies,
            registerModule:_registerModule //_ means its a private variable
            
        }
    
})();