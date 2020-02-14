const { Router } = require('express');
const Character = require('../models/Character');

module.exports = Router()

  .post('/', (req, res) => {
    Character
      .create(req.body)
      .then(character => res.send(character));
  });
