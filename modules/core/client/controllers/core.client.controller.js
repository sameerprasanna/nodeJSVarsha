'use strict';

angular
    .module('ContactsApp')
         .controller('contactsCtrl', function($scope, $state, contactService, contactDeleteService, contactUpdateService){
             var contactsPromise = contactService.getContacts();
             var successCallBack = function(response){
                 $scope.contacts = response;
                 $scope.fields = Object.keys($scope.contacts[0]|| []);
             }
             var failureCallBack = function(err){
                 console.log("error fetching contacts");
             }
             contactsPromise
                    .success(successCallBack)
                    .error(failureCallBack);

             $scope.del = function(contact) {
                 var contactsDelPromise = contactDeleteService.deleteContact(contact);
                 var successCallBack = function (response) {
                     $scope.contacts = response;
                     $scope.fields = Object.keys($scope.contacts[0]|| []);
                     console.log("success");
                 }
                 var failureCallBack = function (err) {
                     console.log("error saving contact");
                 }
                 contactsDelPromise
                     .success(successCallBack)
                     .error(failureCallBack);
             }

     /*        $scope.update = function(contact) {
                 this.showButton = false;
                 var contactsUpdatePromise = contactUpdateService.updateContact(contact);
                 var successCallBack = function (response) {
                     console.log("success");
                 }
                 var failureCallBack = function (err) {
                     console.log("error saving contact");
                 }
                 contactsUpdatePromise
                     .success(successCallBack)
                     .error(failureCallBack);
                      $state.go('create',{contact:contact});

             }*/

             $scope.update = function(contact){
                 console.log("dd"+contact);
                 $state.go('edit',{contactId: contact._id});
             }

         })

    .controller('editCtrl', function($scope, contactId, contactService){
        contactService
            .getContact(contactId)
            .success(function(contact){
                $scope.contact = contact;
            }).error(function(err){
            console.log("Error:: occured during get opertaion")
        })

              

    })
       .controller('saveCtrl', function($scope, contactSaveService){
           var contact = $scope.contact;
           $scope.saveContact = function(contact) {
               var contactsSavePromise = contactSaveService.createContact(contact);
               var successCallBack = function (response) {
                   console.log("success");
               }
               var failureCallBack = function (err) {
                   console.log("error saving contact");
               }
               contactsSavePromise
                   .success(successCallBack)
                   .error(failureCallBack);
           }

    });

/*$scope.del = function(contact) {
    var contactsDelPromise = contactService.deleteContact(contact);
    var successCallBack = function (response) {
        console.log("success");
    }
    var failureCallBack = function (err) {
        console.log("error saving contact");
    }
    contactsDelPromise
        .success(successCallBack)
        .error(failureCallBack);
}*/