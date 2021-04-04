const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const feedbackSchema = mongoose.Schema({
    _id         : { type : Number  , required : true  } ,
    idPara      : { type : Number  , required : true  } ,
    idOrdre     : { type : Number  , required : true  } ,
    sendingDate : { type : Date    , required : false } ,
    content     : { type : String  , required : true  }
}) ;

mongoose.model('feedback',feedbackSchema) ;

module.exports = mongoose.model('feedback') ;