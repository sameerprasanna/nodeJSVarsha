/**
 * Created by varsha on 7/10/2016.
 */

'use strict';
var Chance = require('chance'),
    _ = require('lodash');
var contacts = generateMockContacts();
var chance = new Chance();

module.exports.saveContact = function(contact){
   var ccontact = _.clone(contact);
    ccontact.id = chance.guid();
    contacts.push(ccontact);
    return contacts;
}

module.exports.deleteContact = function(id){
    var boolean = false;
    for(var i in contacts){
        if(contacts[i].id==id){
            contacts.splice(i,1);
            boolean = true;
            return boolean;
        }
    }
}

module.exports.getByID = function(id) {
    //falsy value if foundcontatc is undefined
    var foundContact;
    contacts.some(function(contact, index){
        if(contact.id === id){
            foundContact = {}
            foundContact.contact = contact;
            foundContact.index = index;
            return foundContact;
        }
    });
    return foundContact;
}

module.exports.updateContact = function(index, updatedContact){
    contacts[index] = updatedContact;
    return updatedContact;
}
module.exports.getContacts = contacts;

 function generateMockContacts(){

    var chance = new Chance();
    var contacts =[];
    for(var i =0; i<2; i++){
        var contact = {};
        var name = chance.name().split(' ');
        contact.firstName = name[0];
        contact.lastName = name[1];
        contact.zip = chance.zip();
        contact.email = chance.email();
        contact.address =chance.address();
        contact.id = chance.guid();
        contacts.push(contact);
    }
    return contacts;
}



