const express=require('express')
const mongoose=require('mongoose')
const User=require('../models/usermodel')
const router=express.Router()

//create operation
router.post("/",async(req,res)=>{
    //destructure method
    const{name,email,age}=req.body
 

    try{
        const Useradded=await User.create({
            //backend se   //yeh frontend se
                    name:name,
                    email:email,
                    age:age
                })
                res.status(201).json(Useradded)
    }
    catch(error){
        console.log(error)
res.status(400).json({message:error.message})
    }
   

})
//for get code.........
router.get("/",async(req,res)=>{
    
    try{
        const showall=await User.find()
         
                res.status(200).json(showall)
    }
    catch(error){
        console.log(error)
res.status(500).json({message:error.message})
    }
})


//get single user
router.get("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const singleuser=await User.findById({_id:id})
         
                res.status(200).json(singleuser)
    }
    catch(error){
        console.log(error)
res.status(500).json({error:error.message})
    }
})

//delete
router.delete("/:id",async(req,res)=>{
    const {id}=req.params
    try{
        const singleuser=await User.findByIdAndDelete({_id:id})
         
                res.status(200).json(singleuser)
    }
    catch(error){
        console.log(error)
res.status(500).json({error:error.message})
    }
})

//update
//put/patch
router.patch("/:id",async(req,res)=>{
    const {id}=req.params
    const{name,email,age}=req.body
    try{
        const updateuser=await User.findByIdAndUpdate(id,req.body,{new:true})
         
                res.status(200).json(updateuser)
    }
    catch(error){
        console.log(error)
res.status(500).json({error:error.message})
    }
})

module.exports=router
