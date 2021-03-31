const mongoose = require('mongoose');
//setting mongoose options 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const DoctorSchema = new mongoose.Schema({ 
  _id : Number, 
  username:String,
  password : String,
  firstname: String,
  lastname: String,
  specialty:String,
  numTell: Number,
  status :Boolean

});

mongoose.model('Doctor', DoctorSchema);

module.exports = mongoose.model('Doctor');