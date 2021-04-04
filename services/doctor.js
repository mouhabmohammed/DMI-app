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

const Doctor = require('../mongodb/models/doctor') ;
const User = require('../mongodb/models/user') ;
const Player = require('../mongodb/models/player');
const player = require('../mongodb/models/player');

//POST '/doctor/login'
router.post('/login',async(req,res)=>{
  const doctor = await Doctor.findOne({username :req.body.username}) ;
  const status = doctor.status ;
  console.log(status);
  if (status===true){
    var result = await services.login(req.body.username,req.body.password);
    res.json([result,doctor]);
    }else
    res.send('nothing');
 });

 // Put '/doctor/changePwd'
router.put('/changePwd',services.authenticateToken,(req,res)=>{
    console.log(req.body.username,req.body.oldPassword,req.body.newPassword);
  services.changePwd(req.body.username,req.body.oldPassword,req.body.newPassword);
})


//Get users
router.get('/:play/:category',async(req,res)=>{
  const players = await Player.find({play : req.params.play ,category : req.params.category});
  const traitedPlayres=[];
  players.forEach(player=>{console.log(player);
    traitedPlayres.push({id : player.id , firstname : player.firstname ,
    lastename : player.lastname , category : player.category});
  })
  console.log(traitedPlayres);
  res.json(traitedPlayres);

})

//export router docter
module.exports = router;