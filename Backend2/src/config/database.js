const mongoose = require('mongoose');

function connectedToDb(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Connected to Db")
    })
    .catch((err)=>{
        console.log("error in connection", err)
    })
    
    
}

module.exports= connectedToDb
