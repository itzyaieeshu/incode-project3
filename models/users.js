const db = require('../config/database');

const getUsers = () => db.any('SELECT * FROM users');
const insertUser = (user) => db.any('INSERT INTO users(firstname, lastname, email, password) Values ($1,$2,$3,$4);', [user.firstname, user.lastname, user.email, user.password]);

module.exports = {
    getUsers,
    insertUser,
};
