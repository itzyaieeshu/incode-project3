const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;
const SHA256 = require('crypto-js/sha256');

const db = require('./config/database');

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
});
app.get('/user/new', (req, res) => {
  res.render('pages/add-user', {
    documentTitle: 'Add Users',
    pageName: 'add-user',
  });
});
app.get('/schedules', (req, res) => {
  db.any('SELECT * FROM schedules')
  .then((schedules) => {
    res.render('pages/schedules', {
      documentTitle: 'Schedules',
      pageName: 'schedules',
      schedules,
    });
  })
  .catch((err) => {
    res.send(err);
  });
});
app.get('/schedule/new', (req, res) => {
  db.any('SELECT * FROM users')
  .then((users) => {
    res.render('pages/add-schedule', {
      documentTitle: 'Add Schedules',
      pageName: '',
      days: day,
      timeOption: time,
      users,
    });
  })
  .catch((err) => {
    res.send(err);
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
  const time = (str) => {
    let result;
    if (str.includes('AM')) {
      const resultTime = str.match(/(\d+)/);
      result = `${resultTime[0]}:00:00`;
    } else if (str.includes('PM')) {
      const resultTime = str.match(/(\d+)/);
      result = `${Number(resultTime[0]) + 12}:00:00`;
    }
    return result;
  };
  const schedule = {
    user_id: Number(req.body.user_id),
    day: Number(req.body.day),
    start_at: time(req.body.start_at),
    end_at: time(req.body.end_at),
};
  db.any('INSERT INTO schedules(user_id, day, start_at, end_at) Values ($1,$2,$3,$4);', [schedule.user_id, schedule.day, schedule.start_at, schedule.end_at])
  .then(() => {
    res.redirect('/schedules');
  })
  .catch((err) => {
    res.send(err);
  });
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
  db.any('INSERT INTO users(firstname, lastname, email, password) Values ($1,$2,$3,$4);', [user.firstname, user.lastname, user.email, user.password])
  .then(() => {
    res.redirect('/users');
  })
  .catch((err) => {
    res.send(err);
  });
});
app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
