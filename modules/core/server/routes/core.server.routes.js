/**
 * Created by varsha on 7/10/2016.
 */
'use strict';

var controller = require('../controllers/core.server.controller');
var mainController = require('../controllers/main.server.controller');

module.exports = function(app){


    app
        .route('/')
        .get(mainController.index);
    app
        .route('/api/contact')
            .get(controller.getContacts)
            .post(controller.createContact);

    app
        .route('/api/contact/:contactId')
            .get(controller.getContactById)
            .delete(controller.deleteContact)
            .put(controller.updateContact);

    app.param('contactId', controller.validateContactIdAndForward);

    app
        .route('/api/contactCity/:city')
            .get(controller.getContactsByCity);

    app
        .route('/api/PhoneAreaCode/:areaCode')
            .get(controller.getContactByAreaCode);

    app
        .route('/api/topcontacts')
            .get(controller.getTop10Contacts);

}