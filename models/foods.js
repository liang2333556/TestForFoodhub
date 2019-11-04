let mongoose = require('mongoose');

let FoodSchema = new mongoose.Schema({
        type: String,
       author: String,
       likes: {type: Number, default: 0}
    },
    { collection: 'foodshare' });




module.exports = mongoose.model('Food', FoodSchema);
