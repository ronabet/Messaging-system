const userModel = require("../models/userSchema");

module.exports.getAllUsers = () => {
  return userModel.find({}).exec();
};

module.exports.createUser = (userBody) => {
  const newUser = { ...userBody };
  return userModel.create(newUser);
};

module.exports.getUserById = (query) => {
  return userModel.findOne({ _id: query }).exec();
};

module.exports.get = async (query) => {
  return userModel.exists({ _id: query });
};
