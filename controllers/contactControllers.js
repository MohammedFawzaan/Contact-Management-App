const express = require('express');
const asyncHandler = require('express-async-handler');
const Contacts = require('../models/contactModel');

// getallcontact route /
const getAllContacts = asyncHandler(async (req, res) => {
    let searchname = req.body;
    console.log(searchname);
    let contacts;
    if(searchname) {
        contacts = await Contacts.find({ name: searchname });
        console.log(contacts);
    } else {
        contacts = await Contacts.find({});
    }
    res.render("UI/index.ejs", {contacts});
});

// getonecontact route /:id
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
        email: email
    }).save();
    res.redirect('/api/contacts');
});

// update route /:id
const updateContact = asyncHandler(async (req, res) => {
    let {id} = req.params;
    let {name, email, phoneno} = req.body;
    const oneContact = await Contacts.findByIdAndUpdate(id, {name, email, phoneno});
    if(!oneContact) {
        res.status(404);
        throw new Error("Not Found");
    }
    // res.status(200).json(oneContact);
    res.redirect('/api/contacts');
});

// delete route /:id
const deleteContact = asyncHandler(async (req, res) => {
    let {id} = req.params;
    if(!id) {
        res.status(404);
        throw new Error("Id Not Found!");
    }
    const oneContact = await Contacts.findByIdAndDelete(id);
    // res.json(oneContact);
    res.redirect("/api/contacts");
});

module.exports = {getAllContacts, getContact, createContact, updateContact, deleteContact};