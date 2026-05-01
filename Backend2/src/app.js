const express = require("express")
const noteModel = require("./model/note.model")
const app = express()
const cors = require("cors")
const path = require("path")
app.use(express.static("./public"))


app.use(express.json())
app.use(cors())

app.post("/api/notes",async (req,res)=>{
    const{title,description}= req.body   //destructuring, const title = obj.title;
                                        //const description = obj.description;

    const note = await noteModel.create({
        title, description

    })

    res.status(201).json({
        message:"note Created successfully",
        note
    })
})


/* 
* - GET /api/notes
*- Fetch all the data from mongodb and send them in the response
*/

app.get ("/api/notes",async(req,res)=>{
   const notes = await noteModel.find()  // find method array of object ke form me data return krti hai

   res.status(200).json({
    message:"Notes fetched successfully",
    notes
   })
})


/*
DELETE /api/notes/:id
Delete note with the id from req.params
*/

app.delete("/api/notes/:id", async (req,res)=>{
    const id = req.params.id

     await noteModel.findByIdAndDelete(id)

    console.log(id)

    res.status (200).json({
        message :"Note deleted successfully"
    })
})


/*
PATCH /api/notes/:id
update the description of the note
req.body = {description}
*/
app.patch("/api/notes/:id",async(req,res)=>{
    const id = req.params.id
    const {title,description} = req.body

   await noteModel.findByIdAndUpdate(id,{title,description})

   res.status(200).json({
    message:"Note updated successfully."
   })
})



app.use('*path', (req, res) => {
   
    res.sendFile(path.join(__dirname,"..", '/public/index.html'))
})

module.exports=app