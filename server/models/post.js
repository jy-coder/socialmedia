const mongoose = require('mongoose');



const postSchema = new mongoose.Schema({
 content: {
    type: String,
    required: 'Content is required'
  },
  photo: {
    type: String
    
  },
  creator: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{type: mongoose.Schema.ObjectId, ref: 'User'}],
  comments: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
  }],
  postedBy: {type: mongoose.Schema.ObjectId, ref: 'User'},

},{ timestamps: true })

module.exports = mongoose.model('Post', postSchema);
