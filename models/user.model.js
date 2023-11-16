// models/Email.js
const mongoose = require('mongoose');

const emailSchema = mongoose.Schema({
    email: { type: String, required: true },
    scheduledTime: { type: Date, required: true },
    subject: { type: String, required: true },
    body: { type: String, required: true },
    status: { type: String },
});

const EmailModel = mongoose.model('Email', emailSchema);
module.exports = {
    EmailModel
}
