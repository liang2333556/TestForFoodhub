let mongoose = require('mongoose');

let orderSchema = new mongoose.Schema({


             customer_id:String,         //用户id
            productList: Array,       //商品列表




    },
    { collection: 'order' });

module.exports = mongoose.model('Order', orderSchema);
