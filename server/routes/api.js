const express = require('express');
const router = express.Router();
const request = require('request');
const url = 'https://api.themoviedb.org/3';

// Get most popular result
router.post('/discover/movies', function(req, res) {
    console.log(url + '/discover/movie?api_key=' + req.body.api_key +
                      '&sort_by=popularity.desc&include_adult=true&include_video=true' +
                      '&language=' + req.body.language +
                      '&query=' + req.body.query +
                      '&page=' + req.body.page);
    request.get(url + '/discover/movie?api_key=' + req.body.api_key +
                   '&sort_by=popularity.desc&include_adult=true&include_video=true' +
                   '&language=' + req.body.language +
                   '&query=' + req.body.query +
                   '&page=' + req.body.page).on('error', function(err) { console.log(err); res = err }).pipe(res)
});

// Get text search result
router.post('/search', function (req, res) {
    console.log(url + '/search/movie?api_key=' + req.body.api_key +
                      '&language=' + req.body.language +
                      '&query=' + req.body.query +
                      '&page=' + req.body.page);
    request.get(url + '/search/movie?api_key=' + req.body.api_key +
                   '&language=' + req.body.language +
                   '&query=' + req.body.query +
                   '&page=' + req.body.page).on('error', function(err) { console.log(err); res = err }).pipe(res)
});

module.exports = router;








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
