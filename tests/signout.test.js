/* eslint-disable no-undef */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

const supertest = require('supertest');
const mongoose = require('mongoose');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/movies',
} = process.env;

const {
  fixturedSignedUpUser,
  fixturedSigningInValidUser,
} = require('./fixtures/signinFixtures');

const app = require('../app');
const User = require('../models/user');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('Signing out', () => {
  beforeAll(async () => {
    await request.post('/signup').send(fixturedSignedUpUser);
  });

  afterAll(async () => {
    await User.deleteOne({ email: fixturedSignedUpUser.email });
  });

  describe('with an existent cookie', () => {
    let res;
    let cookies;

    beforeEach(async () => {
      res = await request.post('/signin').send(fixturedSigningInValidUser);
      cookies = res.headers['set-cookie'];
      res = await request.post('/signout').set('Cookie', cookies);
    });

    it('should return status code 200', async () => {
      expect(res.status).toBe(200);
    });
    it('should return message \'Выход прошел успешно\'', async () => {
      expect(res.body.message).toBe('Выход прошел успешно');
    });
    it('should return no token', async () => {
      expect(res.headers['set-cookie'][0]).toMatch(/token=;/);
    });
  });
});
