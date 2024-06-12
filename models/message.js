const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    message: { type: String, required: true, maxLength: 100 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
});

module.exports = mongoose.model('Message', MessageSchema);