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
  .then( function (pages) {
  	res.render('index', {
  		pages: pages
  		})
  })
    // .then(pages => {
    // 	res.json(pages);
    // })
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

  User.findOrCreate({
  where: {
    name: req.body.name,
    email: req.body.email
  }
})
.then(function (values) {

  var user = values[0];

  var page = Page.build({
    title: req.body.title,
    content: req.body.content
  });

  return page.save().then(function (page) {
    return page.setAuthor(user);
  });

})
.then(function (page) {
  res.redirect(page.route);
})
.catch(next);

  // STUDENT ASSIGNMENT:
  // make sure we only redirect *after* our save is complete!
  // note: `.save` returns a promise or it can take a callback.
//   page.save().then(function(savedPage){
//   res.redirect(savedPage.route); // route virtual FTW
// }).catch(next);

	// console.log("Page Complete",page);
	// console.log("Page Route",page.route);
  	// res.json(page)
	// res.redirect(page.route)
 
  	// .catch(console.error);


});

router.get('/users', function(req, res, next) {
  User.findAll().then(function(users){
    // res.send("Testing")
    res.render('users', { users: users });
  })
.catch(next);
});


router.get('/:urlTitle', function (req, res, next) {
    Page.findOne({ 
    where: { 
      urlTitle: req.params.urlTitle 
    } 
  })
  .then(function(obj){
  	//obj.title
    res.render('wikipage', {
    	id: obj.id,
    	title: obj.title,
    	urlTitle: obj.urlTitle,
    	content: obj.content,
    	status: obj.status,
    	date: obj.date,
    	createdAt: obj.createdAt,
    	updatedAt: obj.objupdatedAt
    });
  })
  .catch(next);
});



module.exports = router;


