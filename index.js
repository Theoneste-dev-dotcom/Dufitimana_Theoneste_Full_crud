// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const Contact = require('./model')

const app = express();
const port = 3020;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/contactApp')
.then(()=>{
    console.log("connected")
})
.catch(error=>{
  console.log(error)
})

// Define a schema

// Create a new contact
app.post('/api/contacts', (req, res) => {
  const savedContact = new Contact(req.body);
  savedContact.save();

    res.status(200).json(savedContact);
  
});

// Get all contacts
app.get('/api/contacts',async (req, res) => {
  const contacts = await Contact.find()
    res.status(200).json(contacts);
  
});

// Get a single contact by ID
app.get('/api/contacts/:id', async (req, res) => {
 const contact = await  Contact.findById(req.params.id) 
   
if(!contact){
  res.status(404).json({message: "no data found"})
}
 else{
    res.status(200).json(contact);
 }

});

// Update a contact by ID
app.put('/api/contacts/:id',async (req, res) => {
  const id = req.params.id
 const updatedContact = await Contact.findByIdAndUpdate(id, req.body, { new: true })
  
    if (!updatedContact) {
      return res.status(404).send('Contact not found');
    }
    res.status(200).json(updatedContact);
  });


// Delete a contact by ID
app.delete('/api/contacts/:id',async (req, res) => {
 const contact = await  Contact.findByIdAndDelete(req.params.id)
   if(!contact){
    res.status(500).send("failed to delete");
   }
      
   else {
      return res.status(200).json({message:"successfully deleted"});
    }
    res.status(200).json(deletedContact);
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
