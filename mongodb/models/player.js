const mongoose = require('mongoose') ;
//setting mongoose options 
mongoose.set('useNewUrlParser', true) ;
mongoose.set('useFindAndModify', false) ;
mongoose.set('useCreateIndex', true) ;
mongoose.set('useUnifiedTopology', true) ;

const PlayerSchema = mongoose.Schema({
    _id              : { type : Number , required    :true    } ,
    play             : { type : String , required    : true   } ,
    role             : { type : String , required    : false  } ,
    category         : { type : String , required    : true   } , 
    firstname        : { type : String , required    : true   } ,  
    lastname         : { type : String , required    : true   } , 
    img              : { data : Buffer , contentType : String } ,
    sex              : { type : String                        } , 
    birthDate        : { type : Date                          } ,  
    birthPlace       : { type : String                        } , 
    personalAddress  : { type : String                        } ,  
    fixNum           : { type : Number                        } ,
    tellNum          : { type : Number                        } ,
    fathername       : { type : String                        } , 
    fatherprofession : { type : String                        } , 
    mothername       : { type : String                        } , 
    motherprofession : { type : String                        }  
}) ;

mongoose.model('Player',PlayerSchema) ;

module.exports = mongoose.model('Player') ;