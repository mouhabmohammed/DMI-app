const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const OrdreSchema = mongoose.Schema({
    _id         : { type : Number  , required : true } ,
    _idPlayer   : { type : Number  , required : true } ,
    idDoctor    : { type : Number  , required : true } ,
    idPara      : { type : Number  , required : true } ,
    sendingDate : { type : Date    , required : true } ,
    content     : { type : String  , required : true } ,
    status      : { type : Boolean , required : true } 
}) ;

mongoose.model('feedback',feedbackSchema) ;

module.exports = mongoose.model('feedback') ;