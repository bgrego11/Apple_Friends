var express = require('express');
var app = express();
server = require('http').createServer(app);
io = require('socket.io').listen(server);

cardSchema = require('./cardModel.js');
gameSchema = require('./gameModel.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://heroku_2x8x1pf5:77rq0ebp3pidpukjth60bu8sq1@ds115214.mlab.com:15214/heroku_2x8x1pf5');


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log("connected")
});

 Card = db.model('Card', cardSchema);// var
var Game = db.model('Game', gameSchema);
var deck = []

var test = new Game({name: "test game", host: {id: 1,name: "ben"},players : [1,2,3,4], bdeck : [], wdeck: [], dealer: {id: 1,name: "ben"} , rules: {rule: "losers drink"}})

test.save()




function deckProm() {
  var promise = Card.find({}).exec()
  return promise
  }
function getCards() {
var promise = deckProm();
  promise.then(function(cards){
    console.log(cards);
    });
 };


  function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}


function deal(deck, num) {
        shuffle(deck);
        dealt = deck.slice(0,num)
        deck = deck.slice(num, deck.length - 1)
        return dealt

}


// getCards()
// console.log(deck)
  // shuffle(dk);









// var passport = require('passport')
// , FacebookStrategy = require('passport-facebook').Strategy;
// app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
// app.use(require('body-parser').urlencoded({ extended: true }));
// app.use(require('express-session')({
//   secret: 'keyboard cat',
//   resave: true,
//   saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());
// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//   done(null, user);
// });



// var passport = require('passport')
// FacebookStrategy = require('passport-facebook').Strategy;

// passport.use(new FacebookStrategy({
//   clientID: '1531158273642023',
//   clientSecret: '93aef4aa5842c1247b066c6c888a3116',
//   callbackURL: "http://localhost:3000/auth/facebook/callback"
// },
// function(accessToken, refreshToken, profile, done) {
//   if (profile) {
//     user = profile;
//     return done(null, user);
//     }
//     else {
//     return done(null, false);
//     }
// }
// ));


games = []

app.use(express.static(__dirname + '/public'));

server.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/', function(req,res) {
  res.sendFile(__dirname + '/public/index.html')
});
app.get('/home', function(req,res) {
  res.sendFile(__dirname + '/public/home.html')
});

// Redirect the user to Facebook for authentication.  When complete,
// Facebook will redirect the user back to the application at
//     /auth/facebook/callback
// app.get('/auth/facebook', passport.authenticate('facebook'));

// Facebook will redirect the user to this URL after approval.  Finish the
// authentication process by attempting to obtain an access token.  If
// access was granted, the user will be logged in.  Otherwise,
// authentication has failed.
// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { successRedirect: '/home',
//                                       failureRedirect: '/' }));

io.sockets.on('connection',function(socket){
  socket.on('newGame', function(data) {
    games.push(data);
    console.log("it worked");
    console.log(games);
  });

  socket.on('joinReq', function(data) {
    for (i in games) {
      if (games[i].group === data.group) {
        games[i].members.push(data.reqName);
        console.log("it worked");
        console.log(games);
      }
    }
  })
})
