let mongoose = require('mongoose');

let PolicySchema = new mongoose.Schema({
    _id:{
        "default": "ID",
        "type": String,
        "required": true
    },
    amountInsured:{
        "default": 0,
        "type": Number,
        "required": true
    },
    email:{
        "default": "client email",
        "type": String,
        "required": true
    },
    inceptionDate: {
        "default": "date",
        "type": String,
        "required": true
    },
    installmentPayment: {
        "default": true,
        "type": Boolean,
        "required": true
    },
    clientId: {
        "default": "Client ID",
        "type": String,
        "required": true
    } })

module.exports = mongoose.model('Policy',PolicySchema)