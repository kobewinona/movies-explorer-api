// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

const supertest = require('supertest');
const mongoose = require('mongoose');
const cookie = require('cookie');

const app = require('../app');
const { DB_HOST } = require('../utils/appConfig');
const User = require('../models/user');

const {
  fixturedValidUserDataOne,
} = require('./fixtures/userFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(DB_HOST));

afterAll(() => mongoose.disconnect());

describe('Signing out', () => {
  let res;

  beforeAll(async () => {
    res = await request.post('/signup').send(fixturedValidUserDataOne);
  });

  afterAll(async () => {
    await User.deleteOne({ email: fixturedValidUserDataOne.email });
  });

  describe('with no existent cookie provided', () => {
    beforeAll(async () => {
      res = await request.post('/signout');
    });

    it('should return a status code 400', () => {
      expect(res.status).toBe(400);
    });
    it('should return a JSON object', () => {
      expect(res.body).toBeDefined();
    });
    it('should return message \'Выход прошел успешно\'', async () => {
      expect(res.body.message).toBeDefined();
    });
  });

  describe('with an existent cookie provided', () => {
    beforeAll(async () => {
      const { name, ...userValidData } = fixturedValidUserDataOne;
      res = await request.post('/signin').send(userValidData);
      const rawCookies = cookie.parse(res.headers['set-cookie'][0]);
      const tokenCookie = cookie.serialize('token', rawCookies.token);
      res = await request.post('/signout').set('Cookie', tokenCookie);
    });

    it('should return status code 200', () => {
      expect(res.status).toBe(200);
    });
    it('should return message \'Выход прошел успешно\'', async () => {
      expect(res.body.message).toBe('Выход прошел успешно');
    });
    it('should return no token', () => {
      expect(res.headers['set-cookie'][0]).toMatch(/token=;/);
    });
  });
});
