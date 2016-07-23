/**
 * Created by varsha on 7/10/2016.
 */
'use strict';

module.exports = function(app){

    var controller = require('../controllers/core.server.controller');
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

}