const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const { usersInDB } = require('./test_helper');

const api = supertest(app);

describe('when there is initially one user at db', () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash('sekreet', 10);
    const user = new User({ name: 'admin', username: 'root', passwordHash });

    await user.save();
  });

  describe('add a user', () => {
    test('creation succeeds with valid data', async () => {
      const initialUsers = await usersInDB();

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      };

      await api
        .post('/api/users')
        .send(newUser)
        .expect(200)
        .expect('Content-Type', /application\/json/);

      const usersAtEnd = await usersInDB();
      expect(usersAtEnd).toHaveLength(initialUsers.length + 1);

      const usernames = usersAtEnd.map(u => u.username);
      expect(usernames).toContain(newUser.username);
    });

    test('creation fails when a username already exists', async () => {
      const initialUsers = await usersInDB();

      const newUser = {
        username: 'root',
        name: 'double user',
        password: 'salainen',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toBeDefined();
      expect(result.body.error).toContain('expected `username` to be unique');
      const usersAtEnd = await usersInDB();
      expect(usersAtEnd).toHaveLength(initialUsers.length);
    });

    test('creation fails when a password is too short', async () => {
      const initialUsers = await usersInDB();

      const newUser = {
        username: 'shorty',
        name: 'short pwd',
        password: '12',
      };

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/);

      expect(result.body.error).toBeDefined();
      expect(result.body.error).toContain('Error, password is too short');
      const usersAtEnd = await usersInDB();
      expect(usersAtEnd).toHaveLength(initialUsers.length);
    });


  });

});

afterAll(() => {
  mongoose.connection.close();
});
