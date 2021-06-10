const SHA256 = require('crypto-js/sha256');
const usersModel = require('../models/users');

const index = (req, res) => {
  usersModel
    .getUsers()
    .then((users) => {
      res.render('pages/users', {
        documentTitle: 'Users',
        pageName: 'users',
        users,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
const newUser = (req, res) => {
  res.render('pages/add-user', {
    documentTitle: 'Add Users',
    pageName: 'add-user',
  });
};
const addUser = (req, res) => {
  const user = req.body;
  user.password = SHA256(user.password).toString();
  usersModel
    .insertUser(user)
    .then(() => {
      res.redirect('/users');
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports = {
  index,
  newUser,
  addUser,
};
