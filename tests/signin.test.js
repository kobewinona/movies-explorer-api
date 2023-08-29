// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures,DuplicatedCode

const supertest = require('supertest');
const mongoose = require('mongoose');
const cookie = require('cookie');

const app = require('../app');
const { DB_HOST } = require('../utils/appConfig');
const User = require('../models/user');

const {
  fixturedInvalidUserData,
  fixturedValidUserDataOne,
  fixturedValidUserDataTwo,
} = require('./fixtures/userFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(DB_HOST));

afterAll(() => mongoose.disconnect());

describe('Signin in', () => {
  let res;

  beforeAll(async () => {
    await request.post('/signup').send(fixturedValidUserDataOne);
  });

  afterAll(async () => {
    await User.deleteOne({ email: fixturedValidUserDataOne.email });
  });

  describe('with non-existent email', () => {
    beforeAll(async () => {
      const { name, ...nonExistentUserData } = fixturedValidUserDataTwo;
      res = await request.post('/signin').send(nonExistentUserData);
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
    beforeAll(async () => {
      res = await request.post('/signin').send(fixturedInvalidUserData.email);
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
    beforeAll(async () => {
      const { email, ...userDataWithNoEmail } = fixturedValidUserDataOne;
      res = await request.post('/signin').send(userDataWithNoEmail);
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
    beforeAll(async () => {
      const { password, ...userDataWithNoPassword } = fixturedValidUserDataOne;
      res = await request.post('/signin').send(userDataWithNoPassword);
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
    let tokenCookie;

    beforeAll(async () => {
      const { name, ...userValidData } = fixturedValidUserDataOne;
      res = await request.post('/signin').send(userValidData);
      const rawCookies = cookie.parse(res.headers['set-cookie'][0]);
      tokenCookie = cookie.serialize('token', rawCookies.token);
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
    it('should return an object without password', () => {
      expect(res.body.password).toBeUndefined();
    });
  });
});
