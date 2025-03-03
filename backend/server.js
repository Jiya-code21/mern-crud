const express=require('express')
const app=express()
const mongoose=require('mongoose')
const dotenv=require("dotenv")
dotenv.config();
const cors=require("cors")
app.use(cors())
const userroute=require("./routes/userroute")
//use express.json
app.use(express.json())

mongoose.connect(process.env.URI).then(()=>{
    console.log("connected successfully")
    app.listen(process.env.PORT||8000,(err)=>{
        if(err) console.log(err)
            console.log("running successfully at",process.env.PORT)
    })
}).catch((error)=>{
    console.log("error",error)
})

app.use(userroute)