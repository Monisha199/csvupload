const mongoose = require('mongoose');


const csvSchema = new mongoose.Schema({
    
    header_row :{
        type:[Object],
    },
    data_rows :{
        type:[Object],
    },
    filename:{
        type:String,
        required:true,
    },
},{
    timestamps:true,
});

module.exports = mongoose.model('CSV',csvSchema);