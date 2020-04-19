const User = require('../models/user.model');
const { testUser } = require('./testdata');

describe('user model', () => {

  test('should _not_ contain the passwordHash property', () => {
    const user = new User(testUser);
    expect(user.toJSON().passwordHash).toBeUndefined();
  });

});
