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

        var _updateContact = function (id,contact) {
            return $http.put('/api/contact/'+ id, contact);

        }
        var _createContact = function (contact) {
            var promise = $http.post('/api/contact', contact);
            return promise;
        }
        var _deleteContact = function(contact) {
            var promise = $http.delete('/api/contact/'+contact._id);
            return promise;
        }
        return {
            getContacts: _getContacts,
            getContact: _getContact,
            createContact: _createContact,
            deleteContact:_deleteContact,
            updateContact: _updateContact
        };

    })
    
