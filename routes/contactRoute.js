const express = require('express');
const router = express.Router();
const {getAllContact,getContact, createContact,updateContact,deleteContact} = require('../controllers/contactController');
const validateToken = require('../middleware/validateTokenHandler');

//validate user token

router.use(validateToken);


//get all contacts

router.route('/').get(getAllContact)

//post contact

router.route('/').post(createContact)

//get single contact

router.route('/:id').get(getContact)

//update contact

router.route('/:id').put(updateContact)

//delete contact

router.route('/:id').delete(deleteContact)

module.exports = router;