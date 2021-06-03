const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const SHA256 = require('crypto-js/sha256');

const app = express();
const data = require('./data');

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
'12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('pages/index', {
    decumentTitle: 'Home',
    pageName: 'home',
  });
});
app.get('/users', (req, res) => {
  res.render('pages/users', {
    documentTitle: 'Users',
    pageName: 'users',
    users: data.users,
  });
});
app.get('/user/new', (req, res) => {
  res.render('pages/add-user', {
    documentTitle: 'Add Users',
    pageName: '',
  });
});
app.get('/schedules', (req, res) => {
  res.render('pages/schedules', {
    documentTitle: 'Schedules',
    pageName: 'schedules',
    schedules: data.schedules,
  });
});
app.get('/schedule/new', (req, res) => {
  res.render('pages/add-schedule', {
    documentTitle: 'Add Schedules',
    pageName: '',
    users: data.users,
    days: day,
    timeOption: time,
  });
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
app.post('/schedule/add', (req, res) => {
  const arr = {
    user_id: Number(req.body.user_id),
    day: Number(req.body.day),
    start_at: req.body.start_at,
    end_at: req.body.end_at,
};
  data.schedules.push(arr);
  res.redirect('/schedules');
});
app.post('/user/add', (req, res) => {
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
  res.redirect('/users');
});
app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
