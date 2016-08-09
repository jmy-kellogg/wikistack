var express = require('express');
var app = express();
var morgan = require('morgan');
var path = require('path');
var fs = require('fs');
var mime = require('mime');
var bodyParser = require('body-parser');
var models = require('./models');
var swig = require('swig');
var wikiRouter = require('./routes/wiki');
//app.listen(3001);

//logging
app.use(morgan('dev'));

//wiki routes
app.use('/wiki', wikiRouter);


//static
app.use(express.static(path.join(__dirname, '/public')));

//body-parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//swig
// point res.render to the proper directory
app.set('views', __dirname + '/views');
// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files
// have it use swig to do so
app.engine('html', swig.renderFile);
// turn of swig's caching
swig.setDefaults({cache: false});

//models sync
app.listen(3001, function () {
        console.log('Server is listening on port 3001!');
    });
    
// models.User.sync({force: true})
// .then(function () {
//     return models.Page.sync({force: true})
// })
// .then(function () {
//     app.listen(3001, function () {
//         console.log('Server is listening on port 3001!');
//     });
// })
// .catch(console.error);



