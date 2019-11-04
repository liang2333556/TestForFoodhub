let mongoose = require('mongoose');
const Schema = require("mongoose");

let CommentSchema = new mongoose.Schema({
        author: String,
        content:String,
        essay_id:String,


    },
    { collection: 'comment' });

module.exports = mongoose.model('Comment',CommentSchema);

