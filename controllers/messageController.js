const messageManager = require("../managers/messageManager");
const userManager = require("../managers/userManager");
var exports = module.exports;

exports.sendMessage = async (req, res) => {
  const { sender, receiver } = req.body;

  const [isSenderExist, isReceiverExist] = await Promise.all([
    userManager.get(sender),
    userManager.get(receiver),
  ]);

  if (!isSenderExist || !isReceiverExist) {
    return res.json({ error: "Sender or receiver not exists!" });
  }

  return res.json(await messageManager.sendMessage(req.body));
};

exports.getMessagesByUser = async (req, res) => {
  const userId = req.query.userId;
  return (await messageManager.getMessagesByUser(userId)).length >= 1
    ? res.json(await messageManager.getMessagesByUser(userId))
    : res.json({ message: "No Messages to display!" });
};

exports.getAllUnreadMessages = async (req, res) => {
  const userId = req.query.userId;
  return (await messageManager.getAllUnreadMessages(userId)).length >= 1
    ? res.json(await messageManager.getAllUnreadMessages(userId))
    : res.json({ message: "No Messages to display!" });
};

exports.deleteMessage = async (req, res) => {
  //Todo: fix
  const messageId = req.query.messageId;
  try {
    return res.json(await messageManager.deleteMessage(messageId));
  } catch (err) {
    return res.json({ error: "Error in find Id" });
  }
};

exports.readMessage = async (req, res) => {
  const messageId = req.query.messageId;
  try {
    if ((await messageManager.readingMessage(messageId)) === null) {
      return res.json({ error: "Not found message" });
    }
    return res.json(await messageManager.readingMessage(messageId));
  } catch (err) {
    return res.json({ error: "Error in find message" });
  }
};
