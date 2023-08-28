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
const Movie = require('../models/movie');

const {
  fixturedInvalidMovieData,
  fixturedValidMovieData,
} = require('./fixtures/movieFixtures');
const {
  fixturedValidUserDataOne,
} = require('./fixtures/userFixtures');

const request = supertest(app);

beforeAll(() => mongoose.connect(MONGO_DB_URL));

afterAll(() => mongoose.disconnect());

describe('movies endpoint /', () => {
  let res;
  let tokenCookie;
  let testMovieId;

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

  describe('adding a new movie', () => {
    describe('with no logged in user', () => {
      beforeAll(async () => {
        // noinspection ES6RedundantAwait
        res = await request.post('/movies').send(fixturedValidMovieData);
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
      });

      afterAll(async () => {
        await request.post('/signout').set('Cookie', tokenCookie);
      });

      describe('with no country provided', () => {
        beforeAll(async () => {
          const { country, ...movieDataWithNoCountry } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoCountry).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no director provided', () => {
        beforeAll(async () => {
          const { director, ...movieDataWithNoDirector } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoDirector).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no duration provided', () => {
        beforeAll(async () => {
          const { duration, ...movieDataWithNoDuration } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoDuration).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no year provided', () => {
        beforeAll(async () => {
          const { year, ...movieDataWithNoYear } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoYear).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no description provided', () => {
        beforeAll(async () => {
          const { description, ...movieDataWithNoDescription } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoDescription).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no image provided', () => {
        beforeAll(async () => {
          const { image, ...movieDataWithNoImage } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoImage).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with incorrect image format', () => {
        beforeAll(async () => {
          const movieDataWithInvalidImage = {
            ...fixturedValidMovieData,
            image: fixturedInvalidMovieData.image,
          };
          res = await request.post('/movies').send(movieDataWithInvalidImage).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no trailerLink provided', () => {
        beforeAll(async () => {
          const { trailerLink, ...movieDataWithNoTrailerLink } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoTrailerLink).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with incorrect trailerLink format', () => {
        beforeAll(async () => {
          const movieDataWithInvalidTrailerLink = {
            ...fixturedValidMovieData,
            trailerLink: fixturedInvalidMovieData.trailerLink,
          };
          res = await request.post('/movies').send(movieDataWithInvalidTrailerLink).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no thumbnail provided', () => {
        beforeAll(async () => {
          const { thumbnail, ...movieDataWithNoThumbnail } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoThumbnail).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with incorrect thumbnail format', () => {
        beforeAll(async () => {
          const movieDataWithInvalidThumbnail = {
            ...fixturedValidMovieData,
            thumbnail: fixturedInvalidMovieData.thumbnail,
          };
          res = await request.post('/movies').send(movieDataWithInvalidThumbnail).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no movieId provided', () => {
        beforeAll(async () => {
          const { movieId, ...movieDataWithNoMovieId } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoMovieId).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no nameRU provided', () => {
        beforeAll(async () => {
          const { nameRU, ...movieDataWithNoNameRU } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoNameRU).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with no nameEN provided', () => {
        beforeAll(async () => {
          const { nameEN, ...movieDataWithNoNameEN } = fixturedValidMovieData;
          res = await request.post('/movies').send(movieDataWithNoNameEN).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
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

      describe('with valid movie data', () => {
        beforeAll(async () => {
          res = await request.post('/movies').send(fixturedValidMovieData).set('Cookie', tokenCookie);
          testMovieId = res.body._id;
        });

        afterAll(async () => {
          await Movie.deleteOne({ _id: testMovieId });
        });

        it('should return a status code 200', () => {
          expect(res.status).toBe(200);
        });
        it('should return a JSON object', () => {
          expect(res.body).toBeDefined();
        });
        it('should return movie data identical to the provided data', () => {
          const returnedMovieData = {
            ...res.body, owner: undefined, __v: undefined, _id: undefined,
          };
          expect(returnedMovieData).toEqual(fixturedValidMovieData);
        });
      });
    });
  });

  describe('deleting a movie', () => {
    beforeAll(async () => {
      const { name, ...userValidData } = fixturedValidUserDataOne;
      res = await request.post('/signin').send(userValidData);
      const rawCookies = cookie.parse(res.headers['set-cookie'][0]);
      tokenCookie = cookie.serialize('token', rawCookies.token);
      res = await request.post('/movies').send(fixturedValidMovieData).set('Cookie', tokenCookie);
      testMovieId = res.body._id;
      await request.post('/signout').set('Cookie', tokenCookie);
    });

    afterAll(async () => {
      await Movie.deleteOne({ _id: testMovieId });
    });

    describe('with no logged in user', () => {
      beforeAll(async () => {
        // noinspection ES6RedundantAwait
        res = await request.delete(`/movies/${testMovieId}`);
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
      });

      afterAll(async () => {
        await Movie.deleteOne({ _id: testMovieId });
        await request.post('/signout').set('Cookie', tokenCookie);
      });

      describe('with incorrect movie id format', () => {
        beforeAll(async () => {
          res = await request.delete('/movies/invalidId').set('Cookie', tokenCookie);
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

      describe('with non-existent movie', () => {
        beforeAll(async () => {
          res = await request.delete('/movies/64eaed2958d747dd7d7cbfba').set('Cookie', tokenCookie);
        });

        it('should return a status code 404', () => {
          expect(res.status).toBe(404);
        });
        it('should return a JSON object', () => {
          expect(res.body).toBeDefined();
        });
        it('should return an error message', () => {
          expect(res.body.message).toBeDefined();
        });
      });

      describe('with valid movie id data', () => {
        beforeAll(async () => {
          res = await request.delete(`/movies/${testMovieId}`).set('Cookie', tokenCookie);
        });

        it('should return a status code 200', () => {
          expect(res.status).toBe(200);
        });
        it('should return a JSON object', () => {
          expect(res.body).toBeDefined();
        });
      });
    });
  });
});
