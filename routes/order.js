let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var Order= require("../models/order")
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


router.addCart = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var order = new Order()

  order.customer_id= req.body.customer_id
  order.productList=req.body.productList

  User.findById(req.body.customer_id, function(err) {
    if (err)
      res.json({ message: "Fail to submit!", errmsg : err } )
    else {
      order.save(function (err) {
        if (err)
          res.json({message: "Order NOT Added!", errmsg: err})
        else
          res.json({message: "Order Successfully Added!", data: order})

      })
    }
  })


}





module.exports = router
