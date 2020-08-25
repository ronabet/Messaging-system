const messageManager = require("../managers/messageManager");
const userManager = require("../managers/userManager");
const mongoose = require("mongoose");
var exports = module.exports;

exports.sendMessage = async (req, res) => {
  const { sender, receiver } = req.body;
  if (!checkIDIsValid(sender) || !checkIDIsValid(receiver)) {
    // validator
    return res.json({ error: "Sender or receiver ID invalid" });
  }

  const [isSenderExist, isReceiverExist] = await Promise.all([
    userManager.get(sender),
    userManager.get(receiver),
  ]);

  if (!isSenderExist || !isReceiverExist) {
    return res.json({ error: "Sender or receiver not exists!" });
  }

  return res.json(await messageManager.sendMessage(req.body));
};

const checkIDIsValid = (Id) => {
  return mongoose.Types.ObjectId.isValid(Id);
};

exports.getMessagesByUser = async (req, res) => {
  const userId = req.params.userId;
  return ((await messageManager.getMessagesByUser(userId)).length) > 1
    ? res.json(await messageManager.getMessagesByUser(userId))
    : res.json({ message: "No Messages to display!" });
};

exports.getAllUnreadMessages = async (req, res) => {
    const userId = req.params.userId;
    return ((await messageManager.getAllUnreadMessages(userId)).length) > 1
    ? res.json(await messageManager.getAllUnreadMessages(userId))
    : res.json({ message: "No Messages to display!" });
}

// const checkMessages = async (managerFunction, userId, res) => {
//     if((managerFunction(userId).length).length > 1){
//         return true;
//     }
//     else{
//         return false;
//     }
// }