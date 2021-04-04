var express = require('express') ;
var router = express.Router() ;
const bcrypt =require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
const bodyParser = require('body-parser') ;
const mongoose = require('mongoose') ;
var fs = require('fs');
const multer = require('multer');
require('dotenv').config();
const services= require('./services') ;

router.use(bodyParser.urlencoded({ extended: true })) ;
router.use(bodyParser.json());

const Admin = require('../mongodb/models/admin') ;
const Doctor = require('../mongodb/models/doctor') ;
const User = require('../mongodb/models/user') ;
const { exists } = require('../mongodb/models/user');
const doctor = require('../mongodb/models/doctor');

 
//POST '/admin/addAdmin
router.post("/addAdmin",async(req,res)=>{
    const exist =await User.exists({username:req.body.username}) ; 
    const user =await User.findOne({username:req.body.username}) ;
    if(!exist){
        const {id,username,password,firstname,lastname,specialty}= req.body;
        const hashedpassword = await bcrypt.hash(password,10);
        addUser('Admin',req.body.username,hashedpassword);
        try{
            const user =new Admin() ;
            user._id = id;
            user.username = username ;
            user.firstname = firstname ;
            user.lastname = lastname ;
            user.specialty = specialty ;
            await user.save(function(err){
                if(err)throw err;
                res.status(201).send("Admin was Saved") ;
            });
        }catch{
            res.status(500).send('problem') ;
        }
    }else {  
        res.status(422).send("Admin Username actually used") ;
    }

})


//POST '/admin/login'
router.post('/login',async(req,res)=>{
   console.log('beginning ',req.headers,' work') ;
    var result = await services.login(req.body.username,req.body.password)
    res.json(result);
   
});


// Put '/admin/changePwd
router.put('/changePwd',services.authenticateToken,(req,res)=>{
    console.log(req.body.username,req.body.oldPassword,req.body.newPassword);
  services.changePwd(req.body.username,req.body.oldPassword,req.body.newPassword);
})

//POST '/admin/addDoctor'
router.post('/addDoctor', services.authenticateToken,async(req,res)=>{
    const hashedpassword = await bcrypt.hash(req.body.password,10);
    exist = await addUser('Doctor',req.body.username,hashedpassword);
    console.log('2',exist)
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



//export router admin
module.exports = router;



// addUser function
async function addUser(str, username,pwd){
    var exist = await User.exists({username : username});
    if(!exist){
        var user = new User();
        user.role =  str ;
        user.username = username ;
        user.password = pwd;
        console.log(user);
        await User({ role : str , username : username , password :pwd }).save();
    }
    console.log('1 ' ,exist);
    return exist ;
}



