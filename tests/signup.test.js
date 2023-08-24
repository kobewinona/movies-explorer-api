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
    it('should return a status code 400', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.email);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.email);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.email);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with a name shorter than 2 symbols', () => {
    it('should return a status code 400', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.tooShortName);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.tooShortName);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.tooShortName);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with a name longer than 30 symbols', () => {
    it('should return a status code 400', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.tooLongName);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.tooLongName);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedInvalidUser.tooLongName);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with no email provided', () => {
    it('should return a status code 400', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoEmail);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoEmail);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoEmail);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with no name provided', () => {
    it('should return a status code 400', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoName);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoName);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoName);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with no password provided', () => {
    it('should return a status code 400', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoPassword);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoPassword);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedUserWithNoPassword);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with a non-unique email', () => {
    beforeAll(async () => {
      await User.create(fixturedValidUser);
    });

    afterAll(async () => {
      await User.deleteOne({ email: fixturedValidUser.email });
    });

    it('should return a status code 409', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      expect(res.status).toBe(409);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with valid user data', () => {
    afterEach(async () => {
      await User.deleteOne({ email: fixturedValidUser.email });
    });

    it('should return a status code 200 or 201', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      // noinspection JSUnresolvedVariable
      expect(res.status).toEqual(expect.any(Number, 200, 201));
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      expect(res.body).toBeDefined();
    });
    it('should return user data with id in correct format', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      expect(res.body._id).toBeDefined();
      expect(res.body._id).toMatch(idRegex);
    });
    it('should return user data identical to the provided data', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      const returnedUserData = { ...res.body, __v: undefined, _id: undefined };
      const expectedUserData = { ...fixturedValidUser, password: undefined };
      expect(returnedUserData).toEqual(expectedUserData);
    });
    it('should not return an object with password', async () => {
      const res = await request.post('/signup').send(fixturedValidUser);
      expect(res.body.password).toBeUndefined();
    });
  });
});
