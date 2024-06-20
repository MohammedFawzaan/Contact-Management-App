const asynchandler = require('express-async-handler');
const contact = require('../models/contactmodel.js');
// description Get all Contacts
// GET /api/contacts
// access public
const getContacts = asynchandler(async (req, res) => {
    // res.status(200).json({ message: "get all contacts" });
    const ourcontact = await contact.find({});
    res.send(ourcontact);
});

// description Create new Contacts
// POST /api/contacts
// access public
const createContact = asynchandler(async (req, res) => {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are Mandatary");
    }
    const ourcontact = new contact({
        name: name,
        email: email,
        phone: phone
    }).save();
    res.send(ourcontact);
});

// description get one Contact
// GET /api/contacts/:id
// access public
const getContact = asynchandler(async (req, res) => {
    let { id } = req.params;
    const ourcontact = await contact.findById(id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.send(ourcontact);
});

// description update Contact
// Update PUT /api/contacts/:id
// access public
const updateContact = asynchandler(async (req, res) => {
    let { id } = req.params;
    const ourcontact = await contact.findByIdAndUpdate(id, req.body, {new: true});
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.send(ourcontact);
});

// description update Contact
// DELETE /api/contacts/:id
// access public
const deleteContact = asynchandler(async (req, res) => {
    let { id } = req.params;
    const ourcontact = await contact.findByIdAndDelete(id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.send(ourcontact);
});

module.exports = { getContacts, createContact, getContact, updateContact, deleteContact };