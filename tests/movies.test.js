/* eslint-disable no-undef,import/no-extraneous-dependencies */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures,DuplicatedCode

const supertest = require('supertest');
const mongoose = require('mongoose');
// noinspection NpmUsedModulesInstalled
const cookie = require('cookie');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/movies',
} = process.env;

const app = require('../app');
const User = require('../models/user');
const Movie = require('../models/movie');

const {
  fixturedInvalidUserData,
  fixturedValidUserDataOne,
} = require('./fixtures/userFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('movies endpoint /', () => {
  let res;
  let tokenCookie;

  beforeAll(async () => {
    res = await request.post('/signup').send(fixturedValidUserDataOne);
  });

  afterAll(async () => {
    await User.deleteOne({ email: fixturedValidUserDataOne.email });
  });

  describe('getting movies', () => {
    describe('with no logged in user', () => {
      beforeAll(async () => {
        // noinspection ES6RedundantAwait
        res = await request.get('/movies');
      });

      it('should return a status code 401', () => {
        expect(res.status).toBe(401);
      });
      it('should return a JSON object', () => {
        expect(res.body).toBeDefined();
      });
      it('should return an error message', () => {
        expect(res.body.message).toBeDefined();
      });
    });

    describe('with logged in user', () => {
      beforeAll(async () => {
        const { name, ...userValidData } = fixturedValidUserDataOne;
        res = await request.post('/signin').send(userValidData);
        const rawCookies = cookie.parse(res.headers['set-cookie'][0]);
        tokenCookie = cookie.serialize('token', rawCookies.token);
        res = await request.get('/movies').set('Cookie', tokenCookie);
      });

      afterAll(async () => {
        await request.post('/signout').set('Cookie', tokenCookie);
      });

      it('should return a status code 200', () => {
        expect(res.status).toBe(200);
      });
      it('should return a JSON object', () => {
        expect(res.body).toBeDefined();
      });
      it('should return an array with objects', () => {
        expect(Array.isArray(res.body)).toBeTruthy();
      });
    });
  });
});
