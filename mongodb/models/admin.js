const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const AdminSchema = new mongoose.Schema({  
  _id       : { type : Number , required : true  } ,
  username  : { type : String , required : true  } ,
  firstname : { type : String , required : true  } ,
  lastname  : { type : String , required : true  } 
}) ; 

mongoose.model('Admin', AdminSchema) ;

module.exports = mongoose.model('Admin') ;