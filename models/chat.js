const mongoose = require('mongoose');


const chatSchema = new mongoose.Schema({
// sender: {type: mongoose.Schema.ObjectId, ref:'User'},
// receiver:{type: mongoose.Schema.ObjectId,ref:'User'},
user: [{type: mongoose.Schema.ObjectId, ref:'User'}] ,
message: [{
    text: String,
    created: { type: Date, default: Date.now },
    postedBy: { type: mongoose.Schema.ObjectId, ref: 'User'}
    }]
});



module.exports = mongoose.model('Chat', chatSchema);