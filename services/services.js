const mongoose = require('mongoose') ;
const bcrypt =require('bcrypt') ;
const jwt = require('jsonwebtoken') ;
const multer = require('multer') ; 
require('dotenv').config();

const User = require('../mongodb/models/user') ;
const Docter =  require('../mongodb/models/doctor') ;
const Paramedical =  require('../mongodb/models/paramedical') ;
const Secretary =  require('../mongodb/models/secretary') ;
const Player =  require('../mongodb/models/player') ;
const { findById, find } = require('../mongodb/models/user');

async function login(username,pwd){

    const verifiction = await checkPwd(username , pwd) ;
    if(!verifiction.exist){
        return {ok: false,
            code: 400,
             content:'username not fount '
         } ;
    }else{ 
        try{
            if(verifiction.matched){ 
                const accessToken =jwt.sign({success : true , username : username}, process.env.ACCESS_TOKEN_SECRET) ;
                return {ok: true,
                    code: 200,
                     content:{accessToken:accessToken}
                 } ;
            }else{
                return {ok: false,
                    code: 400,
                     content:'Not Allowed incorrect password'
                 } ;
            }
        }catch{
           return {ok: false,
                   code: 500,
                    content:'Server problem'
                } ;
        }
    }
}


//function authenticateToken
function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization'];
    const token =authHeader && authHeader.split(' ')[1];
    if(token == null)
        return res.sendStatus(401) ;
    jwt.verify(token,process.env.ACCESS_TOKEN_SECRET,(err,user)=>{   
    if (err){
        return res.sendStatus(403);
    } 
    req.user = user;
    next()  ; 
   })
}


//change password 
async function changePwd(username,oldPwd,newPwd){
    var verifiction = await checkPwd(username,oldPwd);
   if( verifiction.exist){
       if(verifiction.matched){
        const hashedNewPwd = await bcrypt.hash(newPwd,10);
        const user = await User.findOne({username : username});
        user.password = hashedNewPwd;
        user.save();
       }
    }
}

//check password
async function checkPwd(username,pwd){
    var user = await User.findOne({username : username});
    if(user){
        var matched = bcrypt.compare(user.password,pwd);
        if(matched) return { exist : true  , matched : true  } ;
        else        return { exist : true  , matched : false } ; 
    }else           return { exist : false , matched : null  } ;      
}


//save image img should be as { data : Buffer  , contentType : String };
async function saveImg(id,img,collection){
    var User;
   if(img){
       switch (collection){
            case 'Doctor' : 
                User = Docter ;
                break ;
            case 'Paramedical' :
                User = Paramedical ;
                break ;
            case 'Secretary' :
                User = Secretary ;
                break ;
            case 'Player' :
                User = Player ;
                break ;     
        }
         const user = await User.findById(id);
         user.img = img ;
         await user.save();
         return true ;
   }else return false ;
}


// add player
async function addplayer(player){
  const plr = await Player.findOne(player);
  if(plr){
    plr = player ;
    plr.save();
}else (await Player.create(player)).save();
  
} 

//
module.exports = {
    login             ,
    authenticateToken ,
    checkPwd          ,
    changePwd         ,
    checkPwd          ,
    saveImg           ,
    addplayer      

}

