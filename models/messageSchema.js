const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// create a mongo schema
const messageSchema = new Schema({
    sender: { type: String, required: true },
    receiver: { type: String, required: true },
    message: { type: String, required: true },
    subject: { type: String, required: true },
    created_at: { type: Date, required: true },
    read: { type: Boolean, default: false }
}, { versionKey: false });

const Message = mongoose.model('Message', messageSchema);

// make this available to our users in our Node applications
module.exports = Message;