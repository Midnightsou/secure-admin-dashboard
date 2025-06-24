const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { type } = require('os');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique:true },
    password : { type: String, required: true},
    email : { type: String, required: true, unique:true },
    role :{ type:String, default: 'admin'},
}, { timeStamps: true });

module.exports = mongoose.model('user', userSchema);