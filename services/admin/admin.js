var express = require('express');
var router = express.Router();
const bcrypt =require('bcrypt');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Admin = require('../../mongodb/models/admin');
const Doctor = require('../../mongodb/models/doctor');


router.post("/addAdmin",async(req,res)=>{
       console.log(req.body.username );
       const count = await Admin.countDocuments((err,count)=>{
           if(err) console.log("1 ",err);
           else {console.log('2 ',count);
        return count;}
       });
       console.log('3 ',count);
    const exist =await Admin.exists({username:req.body.username}); 
    console.log(exist);
    if (exist===false)  {
        try{
        const {id,username,password,firstname,lastname,specialty}= req.body
        const hashedpassword = await bcrypt.hash(password,10);
        console.log(hashedpassword);
    
        const user =new Admin();
         user._id = id;
         user.username = username;
         user.password = hashedpassword;
         user.firstname = firstname;
         user.lastname = lastname;
         user.specialty = specialty;
         await user.save(function(err){
            if(err)throw err;
            console.log('Admin saved!');
        });
        res.status(201).send("Admin was Saved");
    
    
    
    }
    catch{
        res.status(500).send('problem');
    }}
      
else {  
    res.send("Admin Username actually used");}
    
    

})


router.post('/login',async(req,res)=>{
    const user =await Admin.findOne({username :req.body.username},(err,data)=>{
        if(err){
        
            console.log(err);
        }
    }); 
    console.log(user);
  
    if(user===null|| user === undefined){
       return res.status(400).send("Cannot find User");} 

     else  {try{
         const matched =  await bcrypt.compare(req.body.password,user.password);
        if(matched)  { 
            const accessToken =await jwt.sign(user.username,process.env.ACCESS_TOKEN_SECRET,{expiresIn: 15 },(err)=>{
                console.log(err);
            });
            console.log (accessToken);
            res.status(200).json({accessToken:accessToken});

    }else
    {res.send('Not allowed');}
   }catch{
       res.status(500).send('problem');
   }}
});

router.post('/adddoctor',authenticateToken,(req,res)=>{
    var count = Doctor.count({},(err,count)=>{
     console.log(count);
    })
  console.log(count);
})

module.exports = router;

function authenticateToken(req,res,next){
  const authHeader = req.headers['authorization'];
   const token =authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) return res.sendStatus(401) ;

  jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
       
    

    if (err){
        console.log(err);
        return res.sendStatus(403);
       } 
    req.user = user;

    console.log(user);
   
    next()  ; 
   })}
