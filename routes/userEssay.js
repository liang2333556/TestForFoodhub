let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var Essay= require("../models/essay")
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

  Essay.find(function(err, essay) {
    if (err)
      res.send(err)

    res.send(JSON.stringify(essay,null,5))
  })
}
router.findOne = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  Essay.find({ "_id" : req.params.id },function(err,essay) {
    if (err)
      res.json({ message: "Essay NOT Found!", errmsg : err } )
    else
      res.send(JSON.stringify(essay,null,5))
  })
}
router.addEssay = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var essay = new Essay()

  essay.author = req.body.author
  essay.content= req.body.content
  essay.comment=req.body.comment
  essay.date=new Date()
  essay.likes=req.body.likes
  essay.save(function(err) {
    if (err)
      res.json({ message: "New essay NOT Added!", errmsg : err } )
    else
      res.json({ message: "Essay Successfully Added!", data: essay })
  })
}

router.incrementLikes = (req, res) => {

  Essay.findById(req.params.id, function(err,essay) {
    if (err)
      res.json({ message: "Fail to submit!", errmsg : err } )
    else {
      essay.likes += 1
      essay.save(function (err) {
        if (err)
          res.json({ message: "Fail to submit!", errmsg : err } )
        else
          res.json({ message: "Submit your like Successfully!", data: essay})
      })
    }
  })
}


router.deleteEssay = (req, res) => {

  Essay.findByIdAndRemove(req.params.id, function(err) {
    if (err)
      res.json({ message: "Essay NOT DELETED!", errmsg : err } )
    else
      res.json({ message: "Essay Successfully Deleted!"})
  })
}



module.exports = router
