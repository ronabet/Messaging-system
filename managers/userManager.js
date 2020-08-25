const userModel = require("../models/userSchema");
var exports = module.exports;

exports.getAllUsers = () => {
  return userModel.find({}).exec();
};

exports.createUser = (userBody) => {
  const newUser = { ...userBody };
  return userModel.create(newUser);
};

exports.getUserById = (query) => {
  return userModel.findOne({ _id: query }).exec();
};

exports.get = async (query) => {
  return userModel.exists({ _id: query });
};
