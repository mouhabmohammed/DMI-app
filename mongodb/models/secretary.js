const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const SecretarySchema = new mongoose.Schema({  
  _id       : { type : Number , required : true  } ,
  username  : { type : String , required : true  } ,
  firstname : { type : String , required : true  } ,
  lastname  : { type : String , required : true  } ,
  img       : { data : Buffer  , contentType : String }
}) ;
mongoose.model('Secretary',SecretarySchema) ;

module.exports = mongoose.model('Secretary') ;