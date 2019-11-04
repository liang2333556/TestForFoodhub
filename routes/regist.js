let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var User= require("../models/register")
var mongodbUri = "mongodb+srv://leon:liang369369@wit-donation-cluster-lovf9.mongodb.net/foodhub?retryWrites=true&w=majority"
mongoose.connect(mongodbUri)

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})


router.addUser = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var user = new User()

  user.name = req.body.name
  user.pwd = req.body.pwd


  user.save(function(err) {
    if (err)
      res.json({ message: "New user NOT Added!", errmsg : err } )
    else
      res.json({ message: "User Successfully Added!", data: user })
  })
}





module.exports = router
