import express from 'express';
import User from '../models/userModel.js';
const router = express.Router();


router.post('/signup',async(req, res)=>{
    const {name, email, password} = req.body;
    try {
        const newUser = new User({name, email, password});
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});


export default router;