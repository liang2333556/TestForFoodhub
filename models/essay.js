let mongoose = require('mongoose');

let EssaySchema = new mongoose.Schema({
        author: String,
        content:String,
        comment:Array,
        date:Date,
    likes:Number

    },
    { collection: 'essay' });

module.exports = mongoose.model('Essay', EssaySchema);


