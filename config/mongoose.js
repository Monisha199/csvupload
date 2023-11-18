const mongoose = require('mongoose');

// mongoose.connect('mongodb+srv://MonishaM:MoniMongoose@cluster0.ijeekdc.mongodb.net/');
mongoose.connect('mongodb+srv://MonishaM:MoniMongoose@cluster0.ijeekdc.mongodb.net/DB1?retryWrites=true&w=majority')

const db = mongoose.connection;
// const populateDB = require('./populateDB');

db.on('error',console.error.bind(console,'error connecting to db'));
db.once('open',function(){
    console.log("succesfully connected to the database"); //up and running , then print the message
});

module.exports = db;