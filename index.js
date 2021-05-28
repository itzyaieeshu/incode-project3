const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const SHA256 = require('crypto-js/sha256');

const app = express();
const data = require('./data');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Welcome to our schedule website');
});
app.get('/users', (req, res) => {
  res.send(data.users);
});
app.get('/schedules', (req, res) => {
  res.send(data.schedules);
});
app.get('/users/:id', (req, res) => {
  res.send(data.users[req.params.id]);
});
app.get('/users/:id/schedules', (req, res) => {
  const id = Number(req.params.id);
  const result = [];
  for (let i = 0; i < data.schedules.length; i++) {
    const schedule = data.schedules[i];
    if (schedule.user_id === id) {
      result.push(schedule);
    }
  }
  res.send(result);
});
app.post('/users', (req, res) => {
  const arr = req.body;
  // bcrypt.hash(arr.password, saltRounds, (err, hash) => {
  //   if (!err) {
  //     arr.password = hash;
  //     data.users.push(arr);
  //   } else {
  //     console.log(err);
  //   }
  // });
  arr.password = SHA256(arr.password).toString();
  data.users.push(arr);
  res.send(data.users);
});
app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
