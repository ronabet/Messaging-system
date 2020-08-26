const messageManager = require("../managers/messageManager");
const userManager = require("../managers/userManager");

//Write message and check sender/receiver exists
module.exports.sendMessage = async (req, res) => {
  const { sender, receiver } = req.body;

  const [isSenderExist, isReceiverExist] = await Promise.all([
    userManager.get(sender),
    userManager.get(receiver),
  ]);

  return !isSenderExist || !isReceiverExist
    ? res.json({ error: "Sender or receiver not exists!" })
    : res.json(await messageManager.sendMessage(req.body));
};


module.exports.getMessagesByUser = async (req, res) => {
  const userId = req.query.userId;
  let result = await messageManager.getMessagesByUser(userId);
  return result.length >= 1
    ? res.json(result)
    : res.json({ message: "No Messages to display!" });
};


module.exports.getAllUnreadMessages = async (req, res) => {
  const userId = req.query.userId;
  let result = await messageManager.getAllUnreadMessages(userId);
  return result.length >= 1
    ? res.json(result)
    : res.json({ message: "No Messages to display!" });
};

module.exports.deleteMessage = async (req, res) => {
  const messageId = req.query.messageId;
  const userId = req.query.userId;
  let result = await messageManager.deleteMessage(messageId, userId);
  if(result){
    return res.json(result);
  }else{
    return res.json({ error: "Message id not found" });  
  }
};

module.exports.readMessage = async (req, res) => {
  const messageId = req.query.messageId;
  let result = await messageManager.readingMessage(messageId);
  try {
    if (result === null) {
      return res.json({ error: "Message not found" });
    }
    return res.json(result);
  } catch (err) {
    return res.json({ error: "Message not found" });
  }
};
