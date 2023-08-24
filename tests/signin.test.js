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
const { fixturedValidUser } = require('./fixtures/signupFixtures');

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
    it('should return a status code 401', async () => {
      const res = await request.post('/signin').send(fixturedSigningInNonexistentUser);
      expect(res.status).toBe(401);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signin').send(fixturedSigningInNonexistentUser);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signin').send(fixturedSigningInNonexistentUser);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with incorrect email format', () => {
    it('should return a status code 400', async () => {
      const res = await request.post('/signin').send(fixturedSigningInInvalidEmailUser);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signin').send(fixturedSigningInInvalidEmailUser);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signin').send(fixturedSigningInInvalidEmailUser);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with no email provided', () => {
    const { email, ...userDataWithoutEmail } = fixturedSigningInValidUser;

    it('should return a status code 400', async () => {
      const res = await request.post('/signin').send(userDataWithoutEmail);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signin').send(userDataWithoutEmail);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signin').send(userDataWithoutEmail);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with no password provided', () => {
    const { password, ...userDataWithoutPassword } = fixturedSigningInValidUser;

    it('should return a status code 400', async () => {
      const res = await request.post('/signin').send(userDataWithoutPassword);
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signin').send(userDataWithoutPassword);
      expect(res.body).toBeDefined();
    });
    it('should return an error message', async () => {
      const res = await request.post('/signin').send(userDataWithoutPassword);
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with valid user data', () => {
    it('should return a status code 200', async () => {
      const res = await request.post('/signin').send(fixturedSigningInValidUser);
      expect(res.status).toBe(200);
    });
    it('should return a JSON object', async () => {
      const res = await request.post('/signin').send(fixturedSigningInValidUser);
      expect(res.body).toBeDefined();
    });
  });
});
