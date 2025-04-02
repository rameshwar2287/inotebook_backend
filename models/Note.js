const mongoose = require('mongoose');
const {Schema}=require('mongoose')
const notesSchema = new Schema({
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  title:{
    type: String,
    required:true,
  },
  description:{
    type: String,
    required:true,
    unique:true
  },
  tag:{
    type: String,
    default:" GG"
  },
  date:{
    type: Date,
    default:Date.now()
  }
});

module.exports=mongoose.model('notes',notesSchema);