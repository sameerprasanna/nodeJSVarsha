/**
 * Created by varsha on 7/17/2016.
 */

'use strict';

var mongoose = require('mongoose'),
    ObjectId = mongoose.Types.ObjectId,
    Contact = mongoose.model('VContact');

module.exports.saveContact = function(savableContact,callback) {

    console.log(savableContact);
    var checkContact = new Contact(savableContact);
    console.log("saved contact");

    checkContact.save(function (err) {
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

    Contact.find({city: city},{_id:0, firstName:1, lastName: 1, phone:1, city:1}, function(err, contacts){
        if(err) callback(err);
        else callback(null, contacts);
    });
}

module.exports.findContactByAreaCode = function (areaCode,callback) {
    var  mobile = areaCode.substr(0,3);
    Contact.find({phone: {$regex: mobile}},{_id:0, firstName:1, lastName: 1, phone:1, city:1}, function(err, contacts){
        if(err) callback(err);
        else callback(null, contacts);
    });
}

module.exports.getTop10Contacts = function (callback) {
    Contact.find({}).limit(10).exec( function(err, contacts){
        if(err) callback(err);
        else callback(null, contacts);
    });
}

