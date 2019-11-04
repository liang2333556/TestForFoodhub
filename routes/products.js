let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var Product= require("../models/products")
var mongodbUri = "mongodb+srv://leon:liang369369@wit-donation-cluster-lovf9.mongodb.net/foodhub?retryWrites=true&w=majority"
mongoose.connect(mongodbUri,{useNewUrlParser:true})

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})
router.findAll = (req, res) => {
  // Return a JSON representation of our list
  res.setHeader("Content-Type", "application/json")

  Product.find(function(err, products) {
    if (err)
      res.send(err)

    res.send(JSON.stringify(products,null,5))
  })
}
router.findOne = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  Product.find({ "_id" : req.params.id },function(err,product) {
    if (err)
      res.json({ message: "Product NOT Found!", errmsg : err } )
    else
      res.send(JSON.stringify(product,null,5))
  })
}


function getByValue(array, id) {
  var result  = array.filter(function(obj){return obj.id == id} )
  return result ? result[0] : null // or undefined
}

router.addProduct = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var product= new Product()

  product.type = req.body.type
  product.name=req.body.name
  product.price = req.body.price
  product.likes=req.body.likes


  product.save(function(err) {
    if (err)
      res.json({ message: "Product Not Added!", errmsg : err } )
    else
      res.json({ message: "Product Successfully Added!", data: product })
  })
}

router.incrementlikes = (req, res) => {
  // Find the relevant donation based on params id passed in
  // Add 1 to upvotes property of the selected donation based on its id
  var product = getByValue(req.params.id)

  if (product != null) {
    product.likes += 1
    res.json({status : 200, message : "Submit your like Successful" , data : product })
  }
  else
    res.send("Food NOT Found - Submit like NOT Successful!!")

}

router.deleteProduct = (req, res) => {

  Product.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: "Product NOT DELETED!", errmsg : err } )
    else
      res.json({ message: "Product Successfully Deleted!"})
  })
}


router.incrementLikes = (req, res) => {

  Product.findById(req.params.id, function(err,product) {
    if (err)
      res.json({ message: "Product NOT Found!", errmsg : err } )
    else {
      product.likes += 1
      product.save(function (err) {
        if (err)
          res.json({ message: "Submitted your like!", errmsg : err } )
        else
          res.json({ message: "Submit your like Successfully!", data: product})
      })
    }
  })
}



module.exports = router
