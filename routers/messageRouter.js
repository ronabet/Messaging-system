const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const wrapAsync = require("../utils/wrapController");
const messageValidator = require("../validator/inputValidations");

router.post(
  "/",
  messageValidator.validateBodyArray(),
  messageValidator.checkReceiverAndSender,
  messageValidator.validateBodyMiddleWare,
  wrapAsync(messageController.sendMessage)
);
router.get("/", wrapAsync(messageController.getMessagesByUser));
router.get("/unread/", wrapAsync(messageController.getAllUnreadMessages));
router.get("/read/", (req, res, next) => messageValidator.checkOneIdValid(req.query.messageId, res, next), 
    wrapAsync(messageController.readMessage)
);
router.delete("/", (req, res, next) => messageValidator.checkOneIdValid(req.query.messageId, res, next), 
    (req, res, next) => messageValidator.checkOneIdValid(req.query.userId, res, next),
    wrapAsync(messageController.deleteMessage)
);

module.exports = router;
