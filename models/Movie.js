const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var MovieSchema = new Schema({
  poster_path: {
    type: String,
    required: false
  },
  adult: {
    type: Boolean,
    required: false
  },
  overview: {
    type: String,
    required: false
  },
  release_date: {
    type: String,
    required: false
  },
  genre_ids: {
    type: [Number],
    required: false
  },
  id: {
    type: Number,
    required: false
  },
  original_title: {
    type: String,
    required: false
  },
  original_language: {
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  backdrop_path: {
    type: String,
    required: false
  },
  popularity: {
    type: Number,
    required: false
  },
  vote_count: {
    type: Number,
    required: false
  },
  video: {
    type: String,
    required: false
  },
  vote_average: {
    type: Number,
    required: false
  }
});

module.exports = mongoose.model('Movie', MovieSchema);
