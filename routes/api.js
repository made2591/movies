const mongoose = require('mongoose');
const passport = require('passport');
const config = require('../config/database');
require('../config/passport')(passport);
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const Movie = require("../models/movie");

const url = 'https://api.themoviedb.org/3';


router.post('/signup', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
  }
});

router.post('/signin', function(req, res) {
  User.findOne({
    username: req.body.username
  }, function(err, user) {
    if (err) throw err;

    if (!user) {
      res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
    } else {
      // check if password matches
      user.comparePassword(req.body.password, function (err, isMatch) {
        if (isMatch && !err) {
          // if user is found and password is right create a token
          var token = jwt.sign(user.toJSON(), config.secret);
          // return the information including token as JSON
          res.json({success: true, token: 'JWT ' + token});
        } else {
          res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
        }
      });
    }
  });
});

router.post('/add/movie', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    console.log(req.body);
    var newMovie = new Movie({
      poster_path: req.body.poster_path,
      adult: req.body.adult,
      overview: req.body.overview,
      release_date: req.body.release_date,
      genre_ids: req.body.genre_ids,
      id: req.body.id,
      original_title: req.body.original_title,
      original_language: req.body.original_language,
      title: req.body.title,
      backdrop_path: req.body.backdrop_path,
      popularity: req.body.popularity,
      vote_count: req.body.vote_count,
      video: req.body.video,
      vote_average: req.body.vote_average
    });

    newMovie.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Save book failed.'});
      }
      res.json({success: true, msg: 'Successful created new book.'});
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

router.get('/movie', passport.authenticate('jwt', { session: false}), function(req, res) {
  var token = getToken(req.headers);
  if (token) {
    Movie.find(function (err, movies) {
      if (err) return next(err);
      res.json(movies);
    });
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
});

getToken = function (headers) {
  if (headers && headers.authorization) {
    var parted = headers.authorization.split(' ');
    if (parted.length === 2) {
      return parted[1];
    } else {
      return null;
    }
  } else {
    return null;
  }
};

module.exports = router;





// // Get most popular result
// router.post('/discover/movies', function(req, res) {
//     console.log(url + '/discover/movie?api_key=' + req.body.api_key +
//                       '&sort_by=popularity.desc&include_adult=true&include_video=true' +
//                       '&language=' + req.body.language +
//                       '&query=' + req.body.query +
//                       '&page=' + req.body.page);
//     request.get(url + '/discover/movie?api_key=' + req.body.api_key +
//                    '&sort_by=popularity.desc&include_adult=true&include_video=true' +
//                    '&language=' + req.body.language +
//                    '&query=' + req.body.query +
//                    '&page=' + req.body.page).on('error', function(err) { console.log(err); res = err }).pipe(res)
// });
//
// // Get text search result
// router.post('/search', function (req, res) {
//     console.log(url + '/search/movie?api_key=' + req.body.api_key +
//                       '&language=' + req.body.language +
//                       '&query=' + req.body.query +
//                       '&page=' + req.body.page);
//     request.get(url + '/search/movie?api_key=' + req.body.api_key +
//                    '&language=' + req.body.language +
//                    '&query=' + req.body.query +
//                    '&page=' + req.body.page).on('error', function(err) { console.log(err); res = err }).pipe(res)
// });


//const MongoClient = require('mongodb').MongoClient;
//const ObjectID = require('mongodb').ObjectID;

// // Connect
// const connection = (closure) => {
//     return MongoClient.connect('mongodb://0.0.0.0:27017', (err, db) => {
//         if (err) return console.log(err);
//         closure(db);
//     });
// };

// // Error handling
// const sendError = (err, res) => {
//     response.status = 501;
//     response.message = typeof err == 'object' ? err.message : err;
//     res.status(501).json(response);
// };
//
// // Response handling
// let response = {
//     status: 200,
//     data: [],
//     message: null
// };
//
// // // Get users
// // router.get('/users', (req, res) => {
// //     connection((db) => {
// //         db.db('mean').collection('users')
// //             .find()
// //             .toArray()
// //             .then((users) => {
// //                 response.data = users;
// //                 res.json(response);
// //             })
// //             .catch((err) => {
// //                 sendError(err, res);
// //             });
// //     });
// // });
