let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var Food= require("../models/foods")
var mongodbUri= "mongodb+srv://leon:liang369369@wit-donation-cluster-lovf9.mongodb.net/foodhub?retryWrites=true&w=majority"
mongoose.connect(mongodbUri,{useNewUrlParser:true})
mongoose.set("useFindAndModify",false)
let db = mongoose.connection
db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})
router.findAll = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  Food.find(function(err, foods) {
    if (err)
      res.send(err)
    res.send(JSON.stringify(foods,null,5))
  })
}
router.findOne = (req, res) => {
  res.setHeader("Content-Type", "application/json")
  Food.find({ "_id" : req.params.id },function(err, food) {
    if (err)
      res.json({ message: "Food NOT Found!"} )
    else
      res.send(JSON.stringify(food,null,5))
  })
}

function getByValue(array, id) {
  var result  = array.filter(function(obj){return obj.id == id} )
  return result ? result[0] : null // or undefined
}

router.addFood = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var food = new Food()
  food.type = req.body.type
  food.author = req.body.author
  food.likes=req.body.likes
  food.save(function(err) {
    if (err)
      res.json({ message: "Food NOT Added!", errmsg : err } )
    else
      res.json({ message: "Food Added!", data: food })
  })
}

router.incrementlikes = (req, res) => {
  var food = getByValue(req.params.id)

  if (food != null) {
    food.likes += 1
    res.json({status : 200, message : "Submit your like Successful" , food : food })
  }
  else
    res.send("Food NOT Found - Submit like NOT Successful!!")

}

router.deleteFood = (req, res) => {

  Food.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: "Food NOT DELETED!", errmsg : err } )
    else
      res.json({ message: "Food  Successfully Deleted!"})
  })
}

router.incrementLikes = (req, res) => {

  Food.findById(req.params.id, function(err,food) {
    if (err)
      res.json({ message: "Food NOT Found!", errmsg : err } )
    else {
      food.likes += 1
      food.save(function (err) {
        if (err)
          res.json({ message: "Fail to submit your like!", errmsg : err } )
        else
          res.json({ message: "Submit your like Successfully!", data: food })
      })
    }
  })
}

module.exports = router
