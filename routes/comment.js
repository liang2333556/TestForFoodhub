let express = require("express")
let router = express.Router()
let mongoose = require("mongoose")
var Comment= require("../models/comment")
var Essay= require("../models/essay")

var mongodbUri = "mongodb+srv://leon:liang369369@wit-donation-cluster-lovf9.mongodb.net/foodhub?retryWrites=true&w=majority"
mongoose.connect(mongodbUri)

let db = mongoose.connection

db.on("error", function (err) {
  console.log("Unable to Connect to [ " + db.name + " ]", err)
})

db.once("open", function () {
  console.log("Successfully Connected to [ " + db.name + " ]")
})


router.addComment = (req, res) => {

  res.setHeader("Content-Type", "application/json")

  var comment = new Comment()
  comment.author=req.body.author,
  comment.content=req.body.content,
  comment.essay_id=req.body.essay_id,


  comment.save(function(err) {
    if (err)
      res.json({ message: "New comment NOT Added!", errmsg : err } )
    else
      res.json({ message: "Comment Successfully Added!", data: comment })
  })

  Essay.findById(comment.essay_id, function(err,essay) {
    if (err)
      res.json({ message: "Fail to submit!", errmsg : err } )
    else {
      essay.comment.push({content: comment.content, comment_id: comment.id,author:comment.author})
      essay.save(function (err) {
        if (err)
          res.json({ message: "Fail to submit!", errmsg : err } )
        else
          res.json({ message: "Submit your comment Successfully!", data: essay})
      })
    }
  })
}









module.exports = router
