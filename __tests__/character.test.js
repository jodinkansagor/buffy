require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Character = require('../lib/models/Character');

describe('Charater routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  let angel;
  beforeEach(async () => {
    angel = await Character
      .create({
        name: 'Angel',
        species: 'Vampire',
        seasons: [1, 2, 3, 4, 5, 7],
        image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Angel_%28Buffy_the_Vampire_Slayer%29.jpg',
        actor: 'David Boreanaz'
      });
  });

  it('creates a character', () => {
    return request(app)
      .post('/api/v1/character')
      .send({
        name: 'Angel',
        species: 'Vampire',
        seasons: [1, 2, 3, 4, 5, 7],
        image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Angel_%28Buffy_the_Vampire_Slayer%29.jpg',
        actor: 'David Boreanaz'
      })
      .then(res => {
        expect(res.body).toEqual({
          _id: expect.any(String),
          name: 'Angel',
          species: 'Vampire',
          seasons: [1, 2, 3, 4, 5, 7],
          image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Angel_%28Buffy_the_Vampire_Slayer%29.jpg',
          actor: 'David Boreanaz',
          __v: 0
        });
      });

  });
});
