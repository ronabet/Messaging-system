const mongoose = require("mongoose");
var exports = module.exports;
const { body, validationResult } = require('express-validator');


exports.checkReceiverAndSender = (req, res, next) => {
  if (!checkIDIsValid(req.body.sender) || !checkIDIsValid(req.body.receiver)) {
    return res.json({ error: "Sender or receiver ID invalid" });
  }
  return next();
};

exports.checkOneIdValid = (id, res, next) => {
  if (!checkIDIsValid(id)) {
    return res.json({ error: "ID invalid" });
  }
  return next();
};

const checkIDIsValid = (id) => {
  return mongoose.Types.ObjectId.isValid(id);
};

exports.validateBodyArray = () => {
  return [ body('message').exists().notEmpty(), body('subject').exists().notEmpty() ];
}

exports.validateBodyMiddleWare = (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    } else {
        return next();
    }
}
