const fixturedSignedUpUser = {
  email: 'test1@test1.ru',
  name: 'test',
  password: 'qwerty',
};

const fixturedSigningInValidUser = {
  email: 'test1@test1.ru',
  password: 'qwerty',
};

const fixturedSigningInNonexistentUser = {
  email: 'test2@test2.ru',
  password: 'qwerty',
};

const fixturedSigningInInvalidEmailUser = {
  email: 'invalid email',
  password: 'qwerty',
};

module.exports = {
  fixturedSignedUpUser,
  fixturedSigningInValidUser,
  fixturedSigningInNonexistentUser,
  fixturedSigningInInvalidEmailUser,
};
