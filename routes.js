const userContoller = require('./src/controllers/usersController');

module.exports = [
  {
    endpoint: '/users',
    method: 'GET',
    handler: userContoller.listUsers,
  },
]