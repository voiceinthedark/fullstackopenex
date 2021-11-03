require('dotenv').config()
const mongoose = require("mongoose")

const url = process.env.MONGODB_URI;

mongoose.connect(url).then(result => {
    console.log("Connected to phonebook-app mongodb")
}).catch(error => {
    console.log("Error connecting to database", error.message);
})

const EntrySchema = mongoose.Schema({
    name: String,
    number: String,
    show: Boolean
})

EntrySchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});


module.exports = mongoose.model('Entry', EntrySchema);