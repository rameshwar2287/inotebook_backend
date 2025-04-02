const express = require('express');
const router=express.Router();
var bcrypt = require('bcryptjs');
const { body, validationResult } = require('express-validator');
const User=require('../models/User');
const jwt = require('jsonwebtoken');
var fatchuser=require('../middleware/fetchuser');
const JWT_SECRET="bantiahir";
//create a user using post ./api/auth/createuser
router.post('/createuser' ,
[
    body('name').isLength({min:3}),
    body('email').isEmail(),
    body('password').isLength({min:5}),
],
async (req,res)=>{
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        sucess=false;
      return res.status(400).json({errors:errors.array()});
    }  
    let user=await User.findOne({email:req.body.email});
    if(user){
        sucess=false;
        return res.status(400).json({error :" sorry user already exist"});
    }
    try {
        
        const salt =await bcrypt.genSalt(10);
        const secPass =await bcrypt.hash(req.body.password, salt);
        user=await User.create({
            name:req.body.name,
            email:req.body.email,
            password:secPass
        })
        const data={
            user:{
                id :user.id
            }
        }
        sucess=true;
        const jwtData=jwt.sign(data,JWT_SECRET);
        // console.log(user);
        res.json({sucess,jwtData});
    }
    catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");

    }
        
})




// login a user with /api/auth/login
router.post('/login' ,
[
    body('email').isEmail(), 
    body('password','password cannot be blank').exists(),
],
async (req,res)=>{
    let sucess=false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors:errors.array()});
      sucess=false;
    }  
    const {email,password}=req.body;
    try {
        let user=await User.findOne({email});
    if(!user){
        return res.status(400).json({error :" please enter correct details"});
        sucess=false;
    }
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
        return res.status(400).json({error :" please enter correct details"});
        sucess=false;
    }
    const data={
        user:{
            id :user.id
        }
    }
    const jwtData=jwt.sign(data,JWT_SECRET);
    sucess=true;
    res.json({sucess,jwtData});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("some error occured");
    }
})

//route 3 get user details
router.post('/getuser', fatchuser,async (req,res)=>{
try {
    const userId=req.user.id;
    const user=await User.findById(userId).select('-password');
    res.send(user);
} catch (error) {
    console.error(error.message);
        res.status(500).send("some error occured");
}
})
module.exports=router