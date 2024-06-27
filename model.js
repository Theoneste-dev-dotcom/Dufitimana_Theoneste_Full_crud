
const mongoose = require('mongoose')
const contactSchema = new mongoose.Schema({
    street: String,
    zipCode: String,
    email: String,
    phoneNumber: String,
    place: String,
    country: String,
    additionalInfo: String,
    title: String,
    firstName: String,
    lastName: String,
    position: String,
    company: String,
    arena: String,
    employees: String,
  });
  
  // Create a model
  const Contact = mongoose.model('Contact', contactSchema);
  module.exports = Contact