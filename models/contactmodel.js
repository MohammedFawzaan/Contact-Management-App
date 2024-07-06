const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const contactSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneno: {
        type: Number,
        required: true
    }
});

const Contacts = mongoose.model('Contacts', contactSchema);

module.exports = Contacts;