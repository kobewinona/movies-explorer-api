/* eslint-disable no-undef */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

const supertest = require('supertest');
const mongoose = require('mongoose');

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

describe('Signin in', () => {
  beforeAll(async () => {
    await request.post('/signup').send(fixturedSignedUpUser);
  });

  afterAll(async () => {
    await User.deleteOne({ email: fixturedSignedUpUser.email });
  });

  describe('with non-existent email', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signin').send(fixturedSigningInNonexistentUser);
    });

    it('should return a status code 401', async () => {
      expect(res.status).toBe(401);
    });
    it('should return a JSON object', async () => {
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with incorrect email format', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signin').send(fixturedSigningInInvalidEmailUser);
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
    const { email, ...userDataWithoutEmail } = fixturedSigningInValidUser;

    beforeAll(async () => {
      res = await request.post('/signin').send(userDataWithoutEmail);
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
    const { password, ...userDataWithoutPassword } = fixturedSigningInValidUser;

    beforeAll(async () => {
      res = await request.post('/signin').send(userDataWithoutPassword);
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

  describe('with valid user data', () => {
    let res;

    beforeAll(async () => {
      res = await request.post('/signin').send(fixturedSigningInValidUser);
    });

    it('should return a status code 200', () => {
      expect(res.status).toBe(200);
    });
    it('should return a JSON object', () => {
      expect(res.body).toBeDefined();
    });
  });
});
