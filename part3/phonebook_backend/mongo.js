const mongoose = require('mongoose')

const password = process.argv[2];
const entry_name = process.argv[3];
const entry_number = process.argv[4];

const url = `mongodb+srv://data_master:${password}@cluster0.zocpq.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

if (process.argv.length < 3 && process.argv.length > 5){
    console.log(`Bad arguments length: node mongo.js <password> <phonebook_user> <user_number> to add a user
    node mongo.js <password> to query for all users`);
    process.exit(1);
}

mongoose.connect(url);

const phonebook_schema = mongoose.Schema({
  name: String,
  number: String,
  show: Boolean,
});

const Entry = mongoose.model("Entry", phonebook_schema);

if(process.argv.length === 5){

    const entry = new Entry({
      name: entry_name,
      number: entry_number,
      show: true,
    });

    entry.save().then((result) => {
      console.log(`Added ${entry_name} number ${entry_number} to phonebook`);
      mongoose.connection.close();
    });   
} else if (process.argv.length === 3){

    console.log('phonebook:');    
    Entry.find({}).then(result => {
        result.forEach(e => {
            console.log(`${e.name} ${e.number}`);
        })
        mongoose.connection.close()
    })
}


