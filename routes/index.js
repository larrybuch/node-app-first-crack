var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* get hello world page */
router.get('/helloworld', function(req, res){
  res.render('helloworld', {title: 'Hello World!!'});
});

/* get user list page */
router.get('/userlist', function(req, res){
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{},function(e,docs){
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

/* gets new user page */
router.get('/newuser', function(req, res){
  res.render('newuser', {title: 'Add New User'});
});

/* gets posts page and list of posts from the db to display on the posts page*/
router.get('/notes', function(req, res){
  var db = req.db;
  var collection = db.get('notecollection');
  collection.find({},{},function(e,docs){
    res.render('notes', {
      "noteslist" : docs
    });
  });
  // res.render('notes', {title: 'notes'});
});

/* post to add user service */
router.post('/adduser', function(req, res){
  
  // set our internal database variable
  var db = req.db;

  //get our form values, these rely on the name attributes
  var userName = req.body.username;
  var userEmail = req.body.useremail;

  //set our collection
  var collection = db.get('usercollection');

  //submit to the db
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err,doc){
    if (err) {
      // if it failed, return error
      res.send("there was a problem adding the information to the db. whomp.");
    } else {
      // and forward to SUCCESS PAGE
      res.redirect("userlist");
    }
  });
});

/* send post request to add a note to the db */
router.post('/addnote', function(req, res){
  
  // set our internal database variable
  var db = req.db;

  //get our form values, these rely on the name attributes
  var note = req.body.note;

  //set our collection
  var collection = db.get('notecollection');

  //submit to the db
  collection.insert({
    "note": note
  }, function(err,doc){
    if (err) {
      // if it failed, return error
      res.send("there was a problem adding the note to the db. whomp. whomp. whomp.");
    } else {
      // and forward to SUCCESS PAGE
      res.redirect("notes");
    }
  });
});


module.exports = router;









