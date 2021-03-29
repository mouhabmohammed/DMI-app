var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const { model } = require('mongoose');
require('dotenv').config();
async function login(req,res){
    await connectdb();
    const user = await Admin.findOne({name :req.body.name},(err,data)=>{
        if(err){
        
            console.log('1 ',err);
        }
    }); 

  
    if(user===null|| user === undefined){
       return res.status(400).send("Cannot find User");} 

     else  {try{
       //check matching of password and send message "Succses" if it is matched and "Not allowed" else
       if(await bcrypt.compare(req.body.password,user.password))
       { 
           // create a signed token wich is signed with the key "ACCESS_TOKEN_SECRET" that is grabbed from .env
            const accessToken = jwt.sign(user.name,process.env.ACCESS_TOKEN_SECRET,{expiresIn: 15 },(err)=>{
                console.log(err);
            });
            // create an token object and send it to browsser
           res.status(200).json({accessToken:accessToken});
    }else
    {res.send('Not allowed');}
   }catch{
       res.status(500).send();
   }}
}


function authenticateToken(req,res,next){
    // get the request header having the name authorization 
  const authHeader = req.headers['authorization'];
  //grab the token from the authHeader wich has as format "bearer token" if exst
  const token =authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) return res.sendStatus(401) ;

  // check authenticity of the token 
   jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{
       
    

    if (err){
        console.log(err);
        return res.sendStatus(403);
       } 
    req.user = user;

    console.log(user);

    next()  ; 
  });

    
}

module.exports = {login,authenticateToken};
