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
      required: true,
      unique: true
    },
    number: {
      type: String,
      required: true
    },
    show: Boolean
})

EntrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

EntrySchema.plugin(uniqueValidator);


module.exports = mongoose.model('Entry', EntrySchema);