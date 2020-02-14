const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  species: {
    type: String,
    required: true
  },
  seasons: Array,
  image: String,
  actor: String
});

module.exports = mongoose.model('Character', schema);
