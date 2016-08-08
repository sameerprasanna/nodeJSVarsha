/**
 * Created by varsha on 7/31/2016.
 */
'use strict';

angular
    .module('ContactsApp')
        .config(function($stateProvider, $urlRouterProvider){


            $stateProvider
                .state('display',{
                    url:'/display',
                    templateUrl:'modules/core/client/views/display.client.tpl.html'
                })
                .state('create',{
                    url:'/create',
                    templateUrl:'modules/core/client/views/create.client.tpl.html',
                   
                 })
                .state('edit',{
                    url:'/edit/:contactId',
                    templateUrl:'modules/core/client/views/edit.client.tpl.html',
                    resolve: {
                        contactId: function($stateParams){
                            return $stateParams.contactId;
                        }
                    },
                    controller:'editCtrl'
                })
                .state('login',{
                    url:'/login',
                    templateUrl:'modules/core/client/views/login.core.tpl.html'
            });
        });