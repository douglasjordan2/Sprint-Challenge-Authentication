// add a .env file with the JWT_SECRET you'd like to use

module.exports = {
  jwtSecret:
    process.env.JWT_SECRET || 'add a .env file to root of project with the JWT_SECRET variable'
};
