const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user.model');

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({})
    .populate('blogs', {
      url: 1,
      title: 1,
      author: 1,
      id: 1
    });

  response.json(users.map(user => user.toJSON()));
});

usersRouter.post('/', async ({ body: { username, name, password } }, response, next) => {

  if (password.length < 3) {
    return next({
      name: 'PasswordError',
      message: 'Password validation failed: password: Error, password is too short'
    });
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
