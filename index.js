const express = require('express');
const bcrypt = require('bcrypt');

const app = express();
const data = require('./data');

const saltRounds = 10;
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
    console.log(schedule);
    console.log(schedule.user_id);
    const userId = Number(schedule.user_id);
    console.log(userId);
    if (userId === id) {
      result.push(schedule);
    }
  }
  res.send(result);
});
app.post('/users', (req, res) => {
  const arr = req.body;
  let hashedPassword;
  bcrypt.hash(arr.password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    } else {
      hashedPassword = hash;
      console.log(hashedPassword)
      arr.password = hashedPassword;
    }
  });
  console.log(arr.password);
  // console.log(typeof arr);
  data.users.push(arr);
  res.send(data.users);
});
app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
