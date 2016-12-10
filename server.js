var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var reqwest = require('reqwest');
var session = require('express-session');
var moment = require('moment');
var User = require('./models/User.js');
var Player = require('./models/Player.js')
var app = express();
var router = express.Router();
var db = mongoose.connect('mongodb://grantcol:weezybaby21@ds157987.mlab.com:57987/futbuh');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


/** ROUTER **/

router.use(function(req, res, next) {
    // do logging
    console.log(moment().format('YYYY-MM-DD'), "recieved request");
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/players')
     //returns the list of top 50 players
    .get(function(req, res) {
      var payload = Player.find().sort({"stats.overall" : -1}).limit(50);
      payload.exec(function(err, posts) {
         if (err)
             res.send(err);
         res.json(posts);
       });
    })


router.route('/players/totw')

    .get(function(req, res) {
      var payload = Player.find({'type':'IF'}).limit(50);
      payload.exec(function(err, posts) {
         if (err)
             res.send(err);
         res.json(posts);
       });
    })

router.route('/players/worst')
  .get(function(req, res) {
    var payload = Player.find().sort({"stats.overall" : 1}).limit(50);
    payload.exec(function(err, posts) {
       if (err)
           res.send(err);
       res.json(posts);
     });
  })

router.route('/players/:player_id')
    .get(function(req, res) {
      Player.findById(req.params.player_id, function(err, song) {
            if (err)
                res.send(err);
            res.json(song);
        });
    })


router.get('/', function(req, res) {
    res.json({ message: 'waves are crashing all around you will you shred or sink?' });
});

app.use('/api', router);

function createPost(data) {
    var post = new Post();
    post.location = data.location;
    post.price = data.price;
    post.user = 1;
    post.title = data.title;
    return post;
}

app.listen(8888, function () {
  console.log('futbrick listening on port 8888!');
});
