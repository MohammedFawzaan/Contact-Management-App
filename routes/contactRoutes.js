const express = require('express');
const router = express.Router();
const {getAllContacts, getContact, createContact, updateContact, deleteContact} = require("../controllers/contactControllers");

router.route('/').get(getAllContacts);

router.route('/:id').get(getContact);

// router.route('/new').get(newContact);

router.route('/').post(createContact);

router.route('/:id').put(updateContact);

router.route('/:id').delete(deleteContact);

module.exports = router;