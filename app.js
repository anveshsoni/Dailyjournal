
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
var _ = require('lodash');

const homeStartingContent = "Welcome To Your Daily Journal. Here You can add about your Daily chores which you have done in your whole day so in a way it acts like a log book for You.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();
mongoose.connect("mongodb://localhost:27017/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set('view engine', 'ejs');

const newPostSchema = {
  title: String,
  content: String
};
const Post =  mongoose.model("Post",newPostSchema);


app.get("/",function(req,res){
  Post.find({},function(err,posts){
  res.render("home" , {startingContent:homeStartingContent,posts:posts});
  })

});
app.get("/contact",function(req,res){
  res.render("contact", {contact:contactContent})
});
app.get("/about",function(req,res){
  res.render("about" , {aboutContent:aboutContent});
});
app.get("/compose",function(req,res){

  res.render("compose");

});
app.get("/posts/:postId",function(req,res){
 let  requestedId = req.params.postId;

 Post.findOne({_id:requestedId},function(err,post){
   let newContent = post.content;
   let title = post.title;
      res.render("post",{newContent:newContent ,storedTitle:title});
 });
});

app.post("/compose",function(req,res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(function(err){
    if(!err){
        res.redirect("/");
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
