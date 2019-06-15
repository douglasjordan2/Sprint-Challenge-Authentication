const axios = require('axios');

const { authenticate } = require('../auth/authenticate');
const bcrypt = require('bcryptjs');
const db = require('../database/dbConfig');
const tokenService = require('../auth/token-service.js');

module.exports = server => {
  server.post('/api/register', register);
  server.post('/api/login', login);
  server.get('/api/jokes', authenticate, getJokes);
};

async function register(req, res) {
  // implement user registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 12);
  user.password = hash;

  const [id] = await db('users').insert(user).catch(err => {
    res.status(500).json({ message: 'unsuccessful' })
  })

  return db('users')
    .where({ id })
    .first()
    .then(user => {
      res.status(201).json({
        username: user.username
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ message: 'unsuccessful' })
    })
}

function login(req, res) {
  // implement user login
  let { username, password } = req.body;

  return db('users')
    .where({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = tokenService.generateToken(user)
        
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: 'Invalid Credentials' });
      }
    })
}

function getJokes(req, res) {
  const requestOptions = {
    headers: { accept: 'application/json' },
  };

  axios
    .get('https://icanhazdadjoke.com/search', requestOptions)
    .then(response => {
      res.status(200).json(response.data.results);
    })
    .catch(err => {
      res.status(500).json({ message: 'Error Fetching Jokes', error: err });
    });
}
