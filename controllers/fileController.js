const fs = require('fs');
const csv = require('csv-parser');
const CSV = require('../models/csvModel');
const path = require('path');


module.exports.uploadCSV = async function(req,res){

    try{
        if(!req.file){
            return res.status(400).send('No files were uploaded');
        }
        if(req.file.mimetype !== 'text/csv'){
            return res.status(400).send('CSV format is supported');
        }
        //parse the uploaded csv file and store it in array
        var results = [];
    
        fs.createReadStream(req.file.path)
        .pipe(csv())
        .on("data", data => results.push(data))
        .on("end", async() =>{
            //save csv data to db
            if(req.file){
                const oldPath = req.file.path
                const newPath = path.join('/tmp',req.file.originalname);
                fs.rename(oldPath,newPath,(err)=>{
                    if(err){
                        throw err;
                    }
                });
                const csvData = CSV.create({
                    filename:req.file.originalname,
                    header_row:results[0],
                    data_rows:results.slice(1)
                });
                
            }else{
                res.status(400).send('No file uploaded');
            }
            return res.redirect('/');
        });

    }catch(err){
        console.log(err);
        res.status(500).json({message:'cannot process file'})
    }
    
}

//View CSV file
module.exports.viewCSV = async function(req,res){
    try{
        const csvFile = await CSV.findById(req.params.id);
        if(!csvFile){
            return res.status(400).send("File not found");
        }
        const fileLocation = path.join('/tmp');
        const fileData = await new Promise((resolve,reject)=>{
            fs.readFile(path.join(fileLocation,csvFile.filename),'utf8',(err,data)=>{
                if(err){
                    reject(err);
                }else{
                    const rows = data.trim().split('\n')
                    const header_row= rows[0].split(',');
                    const data_rows = rows.slice(1).map(row =>{
                        const row_data ={};
                        row.split(',').forEach((value,index)=>{
                            row_data[header_row[index]]=value
                        });
                        // console.log(row_data);
                        return row_data
                    })
                    resolve({filename:csvFile.filename,header_row,data_rows})
                }
            });
        })
        console.log(fileData,"filedata");
        return res.render('csv_data',{
            fileData,
            title:'CSV content'
        });
    }catch(err){
        res.status(500).send("Cannot find file")
    }
}
