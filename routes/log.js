let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var User= require("../models/register")
var mongodbUri = "mongodb+srv://leon:liang369369@wit-donation-cluster-lovf9.mongodb.net/foodhub?retryWrites=true&w=majority"
mongoose.connect(mongodbUri)


router.logUser = (req, res) => {

  res.setHeader("Content-Type", "application/json")



  User.find({"name": req.body.name,"pwd":req.body.pwd}, function (err, user) {
    if (err){
      res.json({message: "User NOT Found!", errmsg: err})}
    else{
      res.send(JSON.stringify(user, null, 5))}
  })
}


module.exports = router
