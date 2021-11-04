require('dotenv').config()
const mongoose = require("mongoose")
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(result => {
    console.log("Connected to phonebook-app mongodb")
}).catch(error => {
    console.log("Error connecting to database", error.message);
})

const EntrySchema = mongoose.Schema({
  name: {
    type: String,
    minLength: [3, "Name must be at least 3, got {VALUE}"],
    required: [true, "Name is required"],
    unique: true,
  },
  number: {
    type: String,
    minLength: [8, "Number must be at least 8, got {VALUE}"],
    required: [true, "a phone number is required"],
  },
  show: Boolean,
});

EntrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

EntrySchema.plugin(uniqueValidator);


module.exports = mongoose.model('Entry', EntrySchema);