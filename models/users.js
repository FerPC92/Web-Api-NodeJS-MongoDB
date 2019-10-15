let mongoose = require('mongoose');

let UsersSchema = new mongoose.Schema({
    _id:{
        "default": "ID",
        "type": String,
        "required": true
    },
    name:{
        "default": "client Name",
        "type": String,
        "required": true
    },
    email:{
        "default": "client email",
        "type": String,
        "required": true
    },
    role: {
        "default": "user",
        "type": String,
        "required": true
    }
})

module.exports = mongoose.model('User',UsersSchema)