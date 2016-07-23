/**
 * Created by varsha on 7/17/2016.
 */

'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    validator = require('validator');

var validateFieldStrategy = function(property){
    return property.length;
}

var validateEmailStrategy = function(property) {
    return validator.isEmail(property);
}


var validatePhoneStrategy = function(property) {

    return /\d{3}-\d{3}-\d{4}/.test(property);
}

var contactSchema = new Schema({
    
    firstName:{
        type:String,
        default:'',
        trim:true,
        validate:[validateFieldStrategy,'First Name cannot be empty']
    },
    lastName:{
        type:String,
        default:'',
        trim:true,
        validate:[validateFieldStrategy,'Last Name cannot be empty']
    },
    city:{
        type:String,
        default:'',
        trim:true,
        validate:[validateFieldStrategy,'City cannot be empty']
    },
    phone:{
        type: String,
        default:'',
        validate: [validatePhoneStrategy, 'Not a valid phone number'],
        required: [true, 'User phone number required']
    },
    email:{
        type:String,
        default:'',
        trim:true,
        unique:true,
        lowercase:true,
        validate:[validateEmailStrategy,'Enter valid email id']
    }
});

var Contact = mongoose.model('VContact', contactSchema);
module.exports = Contact;