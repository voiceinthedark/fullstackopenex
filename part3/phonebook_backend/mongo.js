const mongoose = require('mongoose')

if (process.argv.length < 5){
    console.log('Bad arguments length: node mongo.js <password> <phonebook_user> <user_number>');
    process.exit(1);
}

const password = process.argv[2];
const entry_name = process.argv[3];
const entry_number = process.argv[4];

const url = `mongodb+srv://data_master:${password}@cluster0.zocpq.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url);

const phonebook_schema = mongoose.Schema({
    name: String,
    number: String,
    show: Boolean
})

const Entry = mongoose.model('Entry', phonebook_schema)

const entry = new Entry({
    name: "Brian Mckenah",
    number: '02-326548',
    show: true,
})

entry.save().then(result => {
    console.log(`Added ${entry_name} number ${entry_number} to phonebook`);
    mongoose.connection.close();
})