const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require("luxon");

const MessageSchema = new Schema({
    message: { type: String, required: true, maxLength: 100 },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, required: true },
});

MessageSchema.virtual('date_formatted').get(function () {
    return `${DateTime.fromJSDate(this.date).toLocaleString(DateTime.TIME_24_SIMPLE)} ${DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_SHORT)}`;
});

module.exports = mongoose.model('Message', MessageSchema);