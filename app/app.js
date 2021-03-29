let express = require('express');
const connect =require('../mongodb/connect');
let  bodyParser = require('body-parser');
const admin = require('../services/admin/admin');
const app =express();


app.use('/admin',admin);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



module.exports = app;
