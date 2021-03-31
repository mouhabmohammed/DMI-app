const mongoose = require('mongoose');
//setting mongoose options 
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

const feedbackSchema = mongoose.Schema({
    _id : { type: Number, required: true },
    idOrdre :{ type: String, required: true },
    status : { type: Boolean, required: true },
    
})