/**
 * Created by varsha on 7/17/2016.
 */

'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Contact = mongoose.model('VContact');
  //  Contact = require('../models/contact.server.model');
//var contactsList = generateContacts();

module.exports.saveContact = function(savableContact,callback) {

    console.log(savableContact);
    var checkContact = new Contact(savableContact);
    console.log("saved contact");

    checkContact.save(function (err) {
   //     if(err){callback(err);}
        console.log(checkContact);
        console.log("Mongoose ready state: " + mongoose.connection.readyState);
        callback(err, checkContact);

    });

}


module.exports.getContacts = function (callback) {
    Contact.find({},function (err, contacts) {
        if(err) throw err;
        console.log(contacts);
        callback(contacts);
    });
}

module.exports.findContactById = function(id,callback){
    Contact.findById(id, function(err, contact) {
        if (err) throw err;
        callback(contact);
    });
}


module.exports.updateContact = function (contactID, updatedContact, callback) {

    Contact.findByIdAndUpdate(contactID, { firstname: updatedContact.firstname, lastname: updatedContact.lastname, email: updatedContact.email, city:updatedContact.city, phone:updatedContact.phone }, function(err, contact) {
        if (err) throw err;
        updatedContact._id = contact._id;
        console.log("====updated contact=====");
        console.log(updatedContact);
        callback(updatedContact);
    });

}
module.exports.deleteContact = function (id,callback) {
    var isDeleted;
    Contact.findByIdAndRemove(id, function(err) {
        if (err){
            console.log("Error: Unable to Delete");
            isDeleted = false;
        }else{
            console.log("Contact Deleted successfully");
            isDeleted = true;
        }
        callback(isDeleted);
    });
}

module.exports.findContactByCity = function (city,callback) {
    var temp,
        foundContacts =[];
    Contact.find({}).where('city').eq(city).exec(function (err,contacts) {
        if(err){
            callback(err);
        } else {
            console.log(contacts);
            for(var i=0; i< contacts.length;i++){
                temp = {firstName:contacts[i].firstName,
                        lastName:contacts[i].lastName,
                        phone: contacts[i].phone,
                        city: contacts[i].city};
                foundContacts.push(temp);
            }
            callback(null,foundContacts);
        }
    });
}

module.exports.findContactByAreaCode = function (areaCode,callback) {
    var temp,
        aCode = areaCode.substr(0,3),
        foundContacts =[];
    console.log(aCode);
    Contact.find({phone: {$regex: aCode}}).exec(function (err,contacts) {
        if(err){
            callback(err);
        } else {
            console.log(contacts);
            for(var i=0; i< contacts.length;i++){
                temp = {firstName:contacts[i].firstName,
                        lastName:contacts[i].lastName,
                        city:contacts[i].city,
                        phone: contacts[i].phone};
                foundContacts.push(temp);
            }
            callback(null,foundContacts);
        }
    })
}

