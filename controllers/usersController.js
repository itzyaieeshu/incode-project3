const SHA256 = require('crypto-js/sha256');
const db = require('../config/database');

const index = (req, res) => {
    db.any('SELECT * FROM users')
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
    // bcrypt.hash(arr.password, saltRounds, (err, hash) => {
    //   if (!err) {
    //     arr.password = hash;
    //     data.users.push(arr);
    //   } else {
    //     console.log(err);
    //   }
    // });
    user.password = SHA256(user.password).toString();
    db.any('INSERT INTO users(firstname, lastname, email, password) Values ($1,$2,$3,$4);', [user.firstname, user.lastname, user.email, user.password])
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
