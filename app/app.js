let express = require('express');
const connect =require('../mongodb/connect');
let  bodyParser = require('body-parser');
const admin = require('../services/admin');
const doctor = require('../services/doctor');
const app =express();


app.use('/admin',admin);
app.use('/doctor',doctor);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



module.exports = app;
