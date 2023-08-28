/* eslint-disable no-undef,import/no-extraneous-dependencies */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures,DuplicatedCode

require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');
// noinspection NpmUsedModulesInstalled
const cookie = require('cookie');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/movies',
} = process.env;

const app = require('../app');
const User = require('../models/user');

const {
  fixturedInvalidUserData,
  fixturedValidUserDataOne,
  fixturedValidUserDataTwo,
} = require('./fixtures/userFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('users endpoint /', () => {
  let res;
  let tokenCookie;

  beforeAll(async () => {
    res = await request.post('/signup').send(fixturedValidUserDataOne);
  });

  afterAll(async () => {
    await User.deleteOne({ email: fixturedValidUserDataTwo.email });
  });

  describe('getting current user', () => {
    describe('with no logged in user', () => {
      beforeAll(async () => {
        // noinspection ES6RedundantAwait
        res = await request.get('/users/me');
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
        res = await request.get('/users/me').set('Cookie', tokenCookie);
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
    });
  });

  describe('updating current user', () => {
    beforeAll(async () => {
      const { name, ...userValidData } = fixturedValidUserDataOne;
      res = await request.post('/signin').send(userValidData);
      const rawCookies = cookie.parse(res.headers['set-cookie'][0]);
      tokenCookie = cookie.serialize('token', rawCookies.token);
    });

    afterAll(async () => {
      await request.post('/signout').set('Cookie', tokenCookie);
    });

    describe('with incorrect email format', () => {
      beforeAll(async () => {
        res = await request.patch('/users/me').send({ email: fixturedInvalidUserData.email }).set('Cookie', tokenCookie);
      });

      it('should return a status code 400', () => {
        expect(res.status).toBe(400);
      });
      it('should return a JSON object', () => {
        expect(res.body).toBeDefined();
      });
      it('should return an error message', () => {
        expect(res.body.message).toBeDefined();
      });
    });

    describe('with a name shorter than 2 symbols', () => {
      beforeAll(async () => {
        res = await request.patch('/users/me').send({ name: fixturedInvalidUserData.tooShortName }).set('Cookie', tokenCookie);
      });

      it('should return a status code 400', () => {
        expect(res.status).toBe(400);
      });
      it('should return a JSON object', () => {
        expect(res.body).toBeDefined();
      });
      it('should return an error message', () => {
        expect(res.body.message).toBeDefined();
      });
    });

    describe('with a name longer than 30 symbols', () => {
      beforeAll(async () => {
        res = await request.patch('/users/me').send({ name: fixturedInvalidUserData.tooLongName }).set('Cookie', tokenCookie);
      });

      it('should return a status code 400', () => {
        expect(res.status).toBe(400);
      });
      it('should return a JSON object', () => {
        expect(res.body).toBeDefined();
      });
      it('should return an error message', () => {
        expect(res.body.message).toBeDefined();
      });
    });

    describe('with valid email data', () => {
      beforeAll(async () => {
        res = await request.patch('/users/me').send({ email: fixturedValidUserDataTwo.email }).set('Cookie', tokenCookie);
      });

      it('should return a status code 200', () => {
        expect(res.status).toBe(200);
      });
      it('should return a JSON object', () => {
        expect(res.body).toBeDefined();
      });
      it('should return user data with updated email', () => {
        const returnedUserData = { ...res.body, __v: undefined, _id: undefined };
        const expectedUserData = {
          email: fixturedValidUserDataTwo.email,
          name: fixturedValidUserDataOne.name,
        };
        expect(returnedUserData).toEqual(expectedUserData);
      });
    });
  });
});
