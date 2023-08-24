const fixturedInvalidUser = {
  email: 'invalid email',
  tooShortName: 't',
  tooLongName: 'Beatae eos est alias voluptas impedit rep\n'
    + '  │ rehenderit velit libero soluta. Temporibus nesciunt re\n'
    + '  │ rum dicta.',
};

const fixturedUserWithNoEmail = {
  tooShortName: 't',
  tooLongName: 'Beatae eos est alias voluptas impedit rep\n'
    + '  │ rehenderit velit libero soluta. Temporibus nesciunt re\n'
    + '  │ rum dicta.',
};

const fixturedUserWithNoName = {
  tooShortName: 't',
  tooLongName: 'Beatae eos est alias voluptas impedit rep\n'
    + '  │ rehenderit velit libero soluta. Temporibus nesciunt re\n'
    + '  │ rum dicta.',
};

const fixturedUserWithNoPassword = {
  tooShortName: 't',
  tooLongName: 'Beatae eos est alias voluptas impedit rep\n'
    + '  │ rehenderit velit libero soluta. Temporibus nesciunt re\n'
    + '  │ rum dicta.',
};

const fixturedValidUser = {
  email: 'test@test.ru',
  name: 'test',
  password: 'qwerty',
};

module.exports = {
  fixturedInvalidUser,
  fixturedUserWithNoEmail,
  fixturedUserWithNoName,
  fixturedUserWithNoPassword,
  fixturedValidUser,
};
