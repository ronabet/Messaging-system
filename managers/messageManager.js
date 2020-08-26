const messageModel = require("../models/messageSchema");
const moment = require("moment");

module.exports.sendMessage = (messageBody) => {
  const newMessage = { ...messageBody };
  const creationDate = moment().format();
  newMessage["created_at"] = creationDate;
  return messageModel.create(newMessage);
};

module.exports.getMessagesByUser = (userId) => {
  return messageModel
    .find({ $or: [{ sender: userId }, { receiver: userId }] })
    .exec();
};

module.exports.getAllUnreadMessages = (userId) => {
  return messageModel
    .find({ $and: [{ receiver: userId }, { read: false }] })
    .exec();
};

module.exports.deleteMessage = (messageId, userId) => {
  return messageModel.findOneAndDelete( { _id: messageId }, { $or: [{ sender: userId }, { receiver: userId }] });
};

module.exports.readingMessage = (messageId) => {
  const filter = { _id: messageId };
  const update = { read: true };
  return messageModel.findOneAndUpdate(filter, update, (err, doc) => {});
};

