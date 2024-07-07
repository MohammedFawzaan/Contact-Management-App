const Contacts = require('../models/contactModel');
const asyncHandler = require('express-async-handler');

// getallcontact route /
const getAllContacts = asyncHandler(async (req, res) => {
    const contacts = await Contacts.find({user_id: req.userAvailable.id});
    res.status(200).json({contacts});
});

// getonecontact route /:id
// @access private
const getContact = asyncHandler(async (req, res) => {
    let {id} = req.params;
    if(!id) {
        res.status(404);
        throw new Error("Id Not Found!");
    }
    const oneContact = await Contacts.findById(id);
    res.status(200).json(oneContact);
});

// create route /
const createContact = asyncHandler(async (req, res) => {
    const {name, phoneno, email} = req.body;
    if(!name || !email || !phoneno) {
        res.status(400);
        throw new Error("All Fields Mandatory");
    }
    const oneContact = new Contacts({
        name: name,
        phoneno: phoneno,
        email: email,
        user_id: req.userAvailable.id
    }).save();
    res.status(200).json({ oneContact });
});

// update route /:id
const updateContact = asyncHandler(async (req, res) => {
    let {id} = req.params;
    if(!id) {
        res.status(404);
        throw new Error("Id Not Found!");
    }
    let {name, email, phoneno} = req.body;

    // Protection from other user 
    const contact = await Contacts.findById(id);
    if(contact.user_id.toString() !== req.userAvailable.id) {
        res.status(403);
        throw new Error("User dont have permission to update other user contact");
    }

    const oneContact = await Contacts.findByIdAndUpdate(id, {name, email, phoneno});
    if(!oneContact) {
        res.status(404);
        throw new Error("Not Found");
    }
    res.status(200).json(oneContact);
});

// delete route /:id
const deleteContact = asyncHandler(async (req, res) => {
    let {id} = req.params;
    if(!id) {
        res.status(404);
        throw new Error("Id Not Found!");
    }

    // Protection from other user 
    const contact = await Contacts.findById(id);
    if(contact.user_id.toString() !== req.userAvailable.id) {
        res.status(403);
        throw new Error("User dont have permission to update other user contact");
    }

    const oneContact = await Contacts.findByIdAndDelete(id);
    res.status(200).json(oneContact);
});

module.exports = {getAllContacts, getContact, createContact, updateContact, deleteContact};