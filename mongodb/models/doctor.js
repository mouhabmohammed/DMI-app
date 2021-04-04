const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const DoctorSchema = new mongoose.Schema({ 
  _id       : { type : Number  , required    : true   } ,
  username  : { type : String  , required    : true   } ,
  firstname : { type : String  , required    : true   } ,
  lastname  : { type : String  , required    : true   } ,
  specialty : { type : String  , required    : false  } ,
  numTell   : { type : Number  , required    : false  } ,
  img       : { data : Buffer  , contentType : String },
  status    : { type : Boolean , required     : true  }
}) ;

mongoose.model('Doctor', DoctorSchema) ;

module.exports = mongoose.model('Doctor') ;