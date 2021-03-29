const mongoose=require('mongoose');

//setting mongoose options 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

//connect to the mongodb
mongoose.connect('mongodb://localhost:27017/DMI');