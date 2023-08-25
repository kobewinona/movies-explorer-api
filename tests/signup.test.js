/* eslint-disable no-undef */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

const supertest = require('supertest');
const mongoose = require('mongoose');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/movies',
} = process.env;

const app = require('../app');
const User = require('../models/user');
const { idRegex } = require('../utils/regex');

const {
  fixturedInvalidUser,
  fixturedUserWithNoEmail,
  fixturedUserWithNoName,
  fixturedUserWithNoPassword,
  fixturedValidUser,
} = require('./fixtures/signupFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('Signing up', () => {
  describe('with incorrect email format', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedInvalidUser.email);
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
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedInvalidUser.tooShortName);
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
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedInvalidUser.tooLongName);
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

  describe('with no email provided', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedUserWithNoEmail);
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

  describe('with no name provided', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedUserWithNoName);
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

  describe('with no password provided', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedUserWithNoPassword);
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

  describe('with a non-unique email', () => {
    let res;

    beforeAll(async () => {
      await User.create(fixturedValidUser);
      res = await request.post('/signup').send(fixturedValidUser);
    });

    afterAll(async () => {
      await User.deleteOne({ email: fixturedValidUser.email });
    });

    it('should return a status code 409', () => {
      expect(res.status).toBe(409);
    });
    it('should return a JSON object', () => {
      expect(res.body).toBeDefined();
    });
    it('should return an error message', () => {
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with valid user data', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedValidUser);
    });

    afterAll(async () => {
      await User.deleteOne({ email: fixturedValidUser.email });
    });

    it('should return a status code 200 or 201', () => {
      // noinspection JSUnresolvedVariable
      expect(res.status).toEqual(expect.any(Number, 200, 201));
    });
    it('should return a JSON object', () => {
      expect(res.body).toBeDefined();
    });
    it('should return user data with id in correct format', () => {
      expect(res.body._id).toBeDefined();
      expect(res.body._id).toMatch(idRegex);
    });
    it('should return user data identical to the provided data', () => {
      const returnedUserData = { ...res.body, __v: undefined, _id: undefined };
      const expectedUserData = { ...fixturedValidUser, password: undefined };
      expect(returnedUserData).toEqual(expectedUserData);
    });
    it('should return an object without password', () => {
      expect(res.body.password).toBeUndefined();
    });
  });
});
