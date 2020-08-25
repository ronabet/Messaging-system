const messageModel = require('../models/messageSchema');
const userManager = require('./userManager');
const moment = require('moment');
var exports = module.exports;

exports.sendMessage = (messageBody) => {
    const newMessage = { ...messageBody };
    const creationDate = moment().format();
    newMessage["created_at"] = creationDate; 
    return messageModel.create(newMessage);
}

exports.getMessagesByUser = (userId) => {
    return messageModel.find({ $or:[ {sender : userId}, { receiver : userId } ]}).exec();
}

exports.getAllUnreadMessages = (userId) => {
    return messageModel.find({ $and: [ { receiver : userId }, { read : false }]}).exec();
}

// const checkIfUserExists = (userID) => {
//     return userManager.getUserById(userID) ? true : false;
// }


