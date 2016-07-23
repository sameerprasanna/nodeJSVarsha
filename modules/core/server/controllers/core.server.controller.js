/**
 * Created by varsha on 7/10/2016.
 */
'use strict';

var mockService = require('../utils/core.server.mock'),
    contactService = require('../services/contact.server.service');

//module.exports.getMockContacts = function (req,res){
//    res.status(200);
//    res.json(mockService.getContacts);
//}


module.exports.getContacts = function (req, res) {
    contactService.getContacts(function (contacts) {
        res.status(200);
        res.json(contacts);
    });
}


module.exports.createContact = function (req,res) {
    var contact = req.body;
    if(!contact){
        res.status(400);
        res.end('error in posting the contact');
    }
    contactService.saveContact(contact, function(err,contact){
        if(err){
        console.log(err);
            res.status(400);
            res.send({message:'error internal error'});
        }
        else{
            res.status(200);
            res.json(contact);
        }
    })

}


module.exports.deleteContact = function (req, res) {
    var contactID = req.metadata.contactId;

    contactService.deleteContact(contactID,function (isDeleted) {
        if (isDeleted) {
            res.status(200)
                .send({message: "Succesfully deleted contact."});
        } else {
            res.status(400)
               .send({message: "Error:: Unable to delete contact. Please try again!!"});
        }
    });
}

module.exports.updateContact = function (req, res) {
    var updatedContact = req.body,
        contactID = req.metadata.contactId;

    contactService.updateContact(contactID, updatedContact, function (isUpdated) {
        if (!isUpdated) {
            res.status(400)
                .send({message: "Error:: Unable to update contact. Please try again!!"});
        } else {
            res.status(200)
                .json(isUpdated);
        }
    });
}

module.exports.getContactById = function (req, res) {
        var contactID = req.metadata.contactId;
    contactService.findContactById(contactID,function (contact) {
        res.status(200);
        res.json(contact);
    });
}

module.exports.validateContactIdAndForward = function (req, res, next, id) {
    var metadata = req.metadata = {};
    metadata.contactId = id;
    contactService.findContactById(id,function (foundContact) {
        if (foundContact) {
            metadata.model = foundContact;
        }
        if (!metadata.model) {
            res
                .status(400)
                .send({message: 'Error: Unable to find Contact with id ' + id});
        }
    });
    next();
}

module.exports.getContactsByCity = function (req,res) {
    var city = req.params.city;
    contactService.findContactByCity(city,function (err,foundContact) {
        if (err) {
            res.status(400)
                .send({message: "Error:: Unable to find contact. Please try again!!"});
        } else {
            res.status(200)
                .json(foundContact);
        }
    })
}

module.exports.getContactByAreaCode = function (req,res) {
    var areaCode = req.params.areaCode;
    contactService.findContactByAreaCode(areaCode,function (err,foundContact) {
        if (err) {
            res.status(400)
                .send({message: "Error:: Unable to find contact. Please try again!!"});
        } else {
            res.status(200)
                .json(foundContact);
        }
    })
}
