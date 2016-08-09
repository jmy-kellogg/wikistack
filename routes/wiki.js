var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var models = require('../models');
var Page = models.Page; 
var User = models.User;

//body parser
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());

router.get('/', function(req, res, next) {
  Page.findAll()
    .then(pages => {
    	res.json(pages);
    })
});

// router.post('/', function(req, res, next) {
//   // res.send('got to POST /wiki/');
//   res.json(req.body.title);
// });

router.get('/add', function(req, res, next) {
  res.render('addpage');
});

router.post('/', function(req, res, next) {
	console.log('i am running')
  // STUDENT ASSIGNMENT:
  // add definitions for `title` and `content`
  var filledForm = req.body;
  function generateUrlTitle (title) {
  if (title) {
    // Removes all non-alphanumeric characters from title
    // And make whitespace underscore
    return title.replace(/\s+/g, '_').replace(/\W/g, '');
  } else {
    // Generates random 5 letter string
    return Math.random().toString(36).substring(2, 7);
  }
}




  var page = Page.build({
    title: filledForm.title,
    content: filledForm.content,
    urlTitle: generateUrlTitle(filledForm.title)
  });

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
  page.save()
  	.then(function(){
  		res.redirect('/wiki');
  	})
  	.catch(console.error);
  // -> after save -> res.redirect('/');
});



module.exports = router;


