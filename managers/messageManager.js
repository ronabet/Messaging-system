const messageModel = require("../models/messageSchema");
const moment = require("moment");
var exports = module.exports;

exports.sendMessage = (messageBody) => {
  const newMessage = { ...messageBody };
  const creationDate = moment().format();
  newMessage["created_at"] = creationDate;
  return messageModel.create(newMessage);
};

exports.getMessagesByUser = (userId) => {
  return messageModel
    .find({ $or: [{ sender: userId }, { receiver: userId }] })
    .exec();
};

exports.getAllUnreadMessages = (userId) => {
  return messageModel
    .find({ $and: [{ receiver: userId }, { read: false }] })
    .exec();
};

exports.deleteMessage = (messageId) => {
  return messageModel.deleteOne({ _id: messageId }, (err, result) => {});
};

exports.readingMessage = (messageId) => {
  const filter = { _id: messageId };
  const update = { read: true };
  return messageModel.findOneAndUpdate(filter, update, (err, doc) => {});
};

// const checkIfUserExists = (userID) => {
//     return userManager.getUserById(userID) ? true : false;
// }
