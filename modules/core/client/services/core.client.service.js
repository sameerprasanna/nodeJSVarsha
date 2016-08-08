/**
 * Created by varsha on 8/3/2016.
 */

'use strict';

angular
    .module('ContactsApp')
    .factory('contactService', function($http){
        var _getContacts = function() {
            var promise = $http.get('/api/contact');
            return promise;
        }
        var _getContact = function(contactId){
            return $http.get('/api/contact/'+contactId);
        }
        return {
            getContacts: _getContacts,
            getContact: _getContact
        };

    })

    .factory('contactSaveService', function($http) {
        var _createContact = function (contact) {
            var promise = $http.post('/api/contact', contact);
            return promise;
        }
        return {
            createContact: _createContact
        };
    })
    .factory('contactDeleteService', function($http){
            var _deleteContact = function(contact) {
                console.log(contact._id);
                var promise = $http.delete('/api/contact/'+contact._id);
                return promise;
            }
            return{
                deleteContact:_deleteContact
            };
    })

    .factory('contactUpdateService', function($http){
        var _updateContact = function(contact) {
            console.log(contact._id);
            var promise = $http.put('/api/contact/'+contact._id, contact);
            return promise;
        }
        return{
            updateContact:_updateContact
        };
    })

