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
      .post('/api/v1/characters')
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

  it('gets a character by id', async () => {
    return request(app)
      .get(`/api/v1/characters/${angel._id}`)
      .then(res => {
        expect(res.body).toEqual({
          _id: angel.id,
          name: 'Angel',
          species: 'Vampire',
          seasons: [1, 2, 3, 4, 5, 7],
          image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Angel_%28Buffy_the_Vampire_Slayer%29.jpg',
          actor: 'David Boreanaz',
          __v: 0
        });
      });
  });

  it('can get all the characters', () => {
    return request(app)
      .get('/api/v1/characters')
      .then(res => {
        expect(res.body).toEqual([{
          _id: angel.id,
          name: 'Angel',
          species: 'Vampire',
          seasons: [1, 2, 3, 4, 5, 7],
          image: 'https://upload.wikimedia.org/wikipedia/en/5/57/Angel_%28Buffy_the_Vampire_Slayer%29.jpg',
          actor: 'David Boreanaz',
          __v: 0
        }]);
      });
  });
});
