const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const fileSchema = new Schema({
  filename: { type: String, required: true },

  path: { type: String, require: true },

  size: { type: String, required: true },

  uuid: { type: String, required: true },

  sender: { type: String, required: false },
  
   receiver: { type: String, required: false },
  
    },
    { timestamps:true} // this create fileds like updated at and created at 
)


module.exports =  mongoose.model('File',fileSchema);