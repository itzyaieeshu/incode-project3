const usersController = require('../controllers/usersController');

module.exports = (app) => {
  app.get('/users', usersController.index);
  app.get('/user/new', usersController.newUser);
  app.post('/user/add', usersController.addUser);
};
