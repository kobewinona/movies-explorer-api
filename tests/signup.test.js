/* eslint-disable no-undef */
// noinspection JSUnresolvedFunction,JSCheckFunctionSignatures

require('dotenv').config();
const supertest = require('supertest');
const mongoose = require('mongoose');

const {
  MONGO_DB_URL = 'mongodb://localhost:27017/bitfilmsdb',
} = process.env;

const app = require('../app');
const User = require('../models/user');
const { idRegex } = require('../utils/regex');

const {
  fixturedInvalidUserData,
  fixturedValidUserDataOne,
} = require('./fixtures/userFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('Signing up', () => {
  let res;

  describe('with incorrect email format', () => {
    beforeAll(async () => {
      const userDataWithInvalidEmail = {
        ...fixturedValidUserDataOne,
        email: fixturedInvalidUserData.email,
      };
      res = await request.post('/signup').send(userDataWithInvalidEmail);
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
      res = await request.post('/signup').send(fixturedInvalidUserData.tooShortName);
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
      res = await request.post('/signup').send(fixturedInvalidUserData.tooLongName);
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
      res = await request.post('/signup').send(userDataWithNoEmail);
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
    beforeAll(async () => {
      const { name, ...userDataWithNoName } = fixturedValidUserDataOne;
      res = await request.post('/signup').send(userDataWithNoName);
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
      res = await request.post('/signup').send(userDataWithNoPassword);
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
    beforeAll(async () => {
      await User.create(fixturedValidUserDataOne);
      res = await request.post('/signup').send(fixturedValidUserDataOne);
    });

    afterAll(async () => {
      await User.deleteOne({ email: fixturedValidUserDataOne.email });
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
    beforeAll(async () => {
      res = await request.post('/signup').send(fixturedValidUserDataOne);
    });

    afterAll(async () => {
      await User.deleteOne({ email: fixturedValidUserDataOne.email });
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
      const expectedUserData = { ...fixturedValidUserDataOne, password: undefined };
      expect(returnedUserData).toEqual(expectedUserData);
    });
    it('should return an object without password', () => {
      expect(res.body.password).toBeUndefined();
    });
  });
});
