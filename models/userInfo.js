const mongoose = require('mongoose');
const config = require('../config/database');

// UserInfo Schema
const UserInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const UserInfo = module.exports = mongoose.model('UserInfo', UserInfoSchema);

module.exports.addUserInfo = function(userInfo, callback){
    userInfo.save(callback);
}