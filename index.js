const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const SHA256 = require('crypto-js/sha256');

const app = express();
const data = require('./data');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index');
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
app.post('/schedules', (req, res) => {
  const arr = {
    user_id: Number(req.body.user_id),
    day: Number(req.body.day),
    start_at: req.body.start_at,
    end_at: req.body.end_at,
};
  data.schedules.push(arr);
  res.send(data.schedules);
});
app.post('/users', (req, res) => {
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
  data.users.push(user);
  res.send(data.users);
});
app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
