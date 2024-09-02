const asyncHandler = require('express-async-handler');
const Contact = require('../model/contactModel');


//@Desc get all contact
//@route get api/contact
//access private

const getAllContact = asyncHandler(async (req,res)=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
})

//@Desc get contact
//@route get api/contact/:id
//access private

const getContact = asyncHandler(async(req,res)=>{
    const contacts = await Contact.findById(req.params.id)
    if(!contacts){
        res.status(404)
        throw new Error("Contact Not Found");
    }
    res.status(200).json(contacts);
})

//@Desc create contact
//@route post api/contact/:id
//access private

const createContact =asyncHandler(async(req,res)=>{
const {name,email,phone} = req.body;
if(!name || !email || !phone){
    res.status(404)
    throw new Error("All the fields are mandatory")
}
const create = await Contact.create({
    name,
    email,
    phone,
    user_id:req.user.id
})
res.status(201).json(create);

})

//@Desc update contact
//@route put api/contact/:id
//access private

const updateContact = asyncHandler(async (req, res) => {
  
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }


    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to update this contact");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );

    // Return the updated contact
    res.status(200).json(updatedContact);
});


//@Desc delete contact
//@route delete api/contact/:id
//access private

const deleteContact = asyncHandler(async (req, res) => {
    // Find the contact by ID
    const contact = await Contact.findById(req.params.id);
    
    // Check if the contact exists
    if (!contact) {
        res.status(404);
        throw new Error("Contact Not Found");
    }

    // Check if the user has permission to delete the contact
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User doesn't have permission to delete this contact");
    }

    // Delete the contact
    await Contact.findByIdAndDelete(req.params.id);

    // Return a success message or the deleted contact
    res.status(200).json({ message: "Contact deleted successfully", contact });
});


module.exports = {getAllContact,getContact, createContact,updateContact,deleteContact}