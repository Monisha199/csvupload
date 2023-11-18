const express = require('express');
const app = express();
const port = 8000;
const path = require('path');
const db = require('./config/mongoose');
// const http = require('http');
// const fs = require('fs');

const multer = require('multer');
const upload = multer({ dest: 'tmp/csv/' });
const csv = require('csv-parser');
// const expressLayouts = require('express-ejs-layouts');
app.use(express.json()) // use to read json data
app.use(express.urlencoded({extended:true})); // use to read through the post requests
app.set('view engine', 'ejs');
app.set('views','./views');
app.use('/',require('./routes'));

app.listen(port, function(err){
    if(err){
        console.log('Error: ',err);
        console.log(`Error: ${err}`);
    }else{
        console.log("server running on ",port);
    }
})
