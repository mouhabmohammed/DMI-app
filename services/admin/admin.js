var express = require('express');
var router = express.Router();
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
const Admin = require('../../mongodb/models/admin');
const Doctor = require('../../mongodb/models/doctor');


//POST '/admin/addAdmin
router.post("/addAdmin",async(req,res)=>{
        const count = await Admin.countDocuments((err,count)=>{
        return count;}
       );
    const exist =await Admin.exists({username:req.body.username}); 
    if(!exist){
        try{
            const {id,username,password,firstname,lastname,specialty}= req.body
            const hashedpassword = await bcrypt.hash(password,10);
            const user =new Admin();
            user._id = id;
            user.username = username;
            user.password = hashedpassword;
            user.firstname = firstname;
            user.lastname = lastname;
            user.specialty = specialty;
            await user.save(function(err){
                if(err)throw err;
                res.status(201).send("Admin was Saved");
            });
        }catch{
            res.status(500).send('problem');
        }
    }else {  
        res.status(422).send("Admin Username actually used");
    }

})


//POST '/admin/login'
router.post('/login',async(req,res)=>{
    const user =await Admin.findOne({username :req.body.username}); 
    if(user===null|| user === undefined){
       return res.status(400).send("Cannot find Admin User");
    }else{
        try{
            const matched =  await bcrypt.compare(req.body.password,user.password);
            if(matched){ 
                    const accessToken =jwt.sign({id : user._id,username : user.username},process.env.ACCESS_TOKEN_SECRET);
                    res.status(200).json({accessToken:accessToken});

            }else{
                res.send('Not allowed');
            }
        }catch{
            res.status(500).send('server problem');
        }
    }
});


//POST '/admin/addDoctor'
router.post('/addDoctor', authenticateToken,async(req,res)=>{

    const exist = await Doctor.exists({username : req.body.username});
    if(!exist){
        try{
            var count = await Doctor.countDocuments({},(err,count)=>{
            if(err){
               console.log(err);}
            return count;
            })
            const doctor = new Doctor();
            doctor._id = count + 1;
            doctor.username = req.body.username;
            const hashedpassword = await bcrypt.hash(req.body.password,10);
            doctor.password = hashedpassword;
            doctor.firstname = req.body.firstname;
            doctor.lastname = req.body.lastname;
            doctor.status = true;

            doctor.save(err=>{
                if(err)throw err;
                    res.status(200).send(' Doctor was saved ');
            });
        }catch{
            res.status(500).send('server problem');
        }
        

    }else {
        res.status(422).send(' username actually used');
    }
  
  
}
)


//PUT 'admin/changePwd'
router.put('/changePwd',authenticateToken,async(req,res)=>{
    const admin = Admin.findOne();
})

//export router admin
module.exports = router;


//function authenticateToken
 function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token =authHeader && authHeader.split(' ')[1];
   // console.log('token ',token);
    if(token == null)
        return res.sendStatus(401) ;
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{   
    if (err){
        console.log(err);
        return res.sendStatus(403);
    } 
    req.user = user;
    next()  ; 
   })
}
