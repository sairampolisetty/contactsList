import express from "express"
import Contact from "../mongodb/models/post.js"

const router = express.Router()

router.route('/')
    .get(async(req,res)=>{
        const contacts= await Contact.find({})
        res.status(200).json(contacts)
    })
    .post(async(req,res)=>{
        const {name,email,phone}=req.body

        if(!name || !email || !phone){
            return res.status(400).json({msg:"Kindly fill all details"})
        }

        const newContact= await Contact.create({name,email,phone})
        res.status(201).json({success:true, data:newContact, msg:"contact added successfully to the database"})
    })

router.route('/:id')
    .delete(async(req,res)=>{
        const {id}=req.params
        const deleteContact = await Contact.findByIdAndDelete(id)
        res.status(200).json({success:true,msg:"contact deleted successfully from the database"})
    })

export default router