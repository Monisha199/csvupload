const CSV = require('../models/csvModel');

module.exports.home = async function(req,res){
    try{
        const csvFiles = await CSV.find({});
        console.log(csvFiles,typeof(csvFiles));
        console.log(csvFiles.filename);
        return res.render('home',{
            files:csvFiles,
            title:'Home'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({message:"cannot update contents to home page"})
    }
   
}

