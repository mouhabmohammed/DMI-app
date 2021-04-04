const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const UserSchema = mongoose.Schema({
    role      : { type : String , required : true } ,
    username  : { type : String , required : true } ,
    password : { type : String , required : true }
}) ;
 
mongoose.model('User', UserSchema) ;

module.exports = mongoose.model('User') ;
