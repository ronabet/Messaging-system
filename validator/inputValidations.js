const mongoose = require("mongoose");
var exports = module.exports;

exports.checkReceiverAndSender = (req, res, next) => {
  if (!checkIDIsValid(req.body.sender) || !checkIDIsValid(req.body.receiver)) {
    return res.json({ error: "Sender or receiver ID invalid" });
  }
  next();
};

exports.checkOneIdValid = (id, res, next) => {
  if (!checkIDIsValid(id)) {
    return res.json({ error: "ID invalid" });
  }
  return next();
};

const checkIDIsValid = (Id) => {
  return mongoose.Types.ObjectId.isValid(Id);
};

// const defaultValidationOptions = {
//   abortEarly: false,
//   allowUnknown: false,
//   convert: true,
// };

// const normalizeRequest = (req, value) => {
//   req.originalBody = req.body;
//   req.body = value.body;

//   req.originalQuery = req.query;
//   req.query = value.query;

//   req.originalParams = req.params;
//   req.params = value.params;
// };

// const ValidateRequest = (schema, options = defaultValidationOptions) => {
//   const validator = async (req) => {
//       const { error, value } = schema.unknown().validate(req, options);
//       if (error) {
//           throw error;
//       }

//       if (options.convert) {
//           normalizeRequest(req, value);
//       }
//   };

//   return wrapValidator(validator);
// };
