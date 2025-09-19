import express from "express"
import Contact from "../mongodb/models/post.js"

const router = express.Router()

router.route('/')
    .get(async(req,res)=>{
        const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;  // Show 5 per page by default

    const skip = (page - 1) * limit;

    const contacts = await Contact.find({})
        .skip(skip)
        .limit(limit);

    const total = await Contact.countDocuments();

    res.status(200).json({ 
        contacts, 
        total, 
        page, 
        totalPages: Math.ceil(total / limit)
    });
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