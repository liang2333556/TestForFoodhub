let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var Product= require("../models/products")
var mongodbUri = "mongodb+srv://leon:liang369369@wit-donation-cluster-lovf9.mongodb.net/foodhub?retryWrites=true&w=majority"
mongoose.connect(mongodbUri)


router.searchProduct = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  var reg = new RegExp(req.body.name, "i")
  Product.find({name: {$regex: reg}}, function (err, user) {
    if (err) {
      res.json({message: "User NOT Found!", errmsg: err})
    } else {
      res.send(JSON.stringify(user, null, 5))
    }
  })
}



module.exports = router
