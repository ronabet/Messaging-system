const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  id: Schema.ObjectId,
  name: String,

}, { versionKey: false });

const User = mongoose.model('User', userSchema);

module.exports = User;