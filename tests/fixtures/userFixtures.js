const fixturedInvalidUserData = {
  email: 'invalid email',
  tooShortName: 't',
  tooLongName: 'Beatae eos est alias voluptas impedit rep\n'
    + '  │ rehenderit velit libero soluta. Temporibus nesciunt re\n'
    + '  │ rum dicta.',
};

const fixturedValidUserDataOne = {
  email: 'test1@test1.ru',
  name: 'test one',
  password: 'qwerty',
};

const fixturedValidUserDataTwo = {
  email: 'test2@test2.ru',
  name: 'test two',
  password: 'qwerty',
};

module.exports = {
  fixturedInvalidUserData,
  fixturedValidUserDataOne,
  fixturedValidUserDataTwo,

};
