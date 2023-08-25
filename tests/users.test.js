/* eslint-disable no-undef */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

const supertest = require('supertest');
const mongoose = require('mongoose');
const cookie = require('cookie');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/movies',
} = process.env;

const app = require('../app');
const User = require('../models/user');

const {
  fixturedSignedUpUser,
  fixturedSigningInValidUser,
  fixturedSigningInNonexistentUser,
  fixturedSigningInInvalidEmailUser,
} = require('./fixtures/signinFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('User endpoint /', () => {
  describe('getting current user', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedSignedUpUser);
      res = await request.post('/signin').send(fixturedSigningInValidUser);
      const rawCookies = cookie.parse(res.headers['set-cookie'][0]);
      const tokenCookie = cookie.serialize('token', rawCookies.token);
      res = await request.get('/users/me').set('Cookie', tokenCookie);
    });

    afterAll(async () => {
      await User.deleteOne({ email: fixturedSignedUpUser.email });
      await request.post('/signout').send(fixturedSigningInValidUser);
    });

    it('should return a status code 200', () => {
      expect(res.status).toBe(200);
    });
    it('should return a JSON object', () => {
      expect(res.body).toBeDefined();
    });
  });
});
