const db = require('../config/database');

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
'12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

module.exports = (app) => {
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

app.post('/schedule/add', (req, res) => {
  const timestamp = (str) => {
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
  console.log('test');
  console.log(req.body.user_id);
  const schedule = {
    user_id: Number(req.body.user_id),
    day: Number(req.body.day),
    start_at: timestamp(req.body.start_at),
    end_at: timestamp(req.body.end_at),
};
console.log(schedule);
  db.any('INSERT INTO schedules(user_id, day, start_at, end_at) Values ($1,$2,$3,$4);', [schedule.user_id, schedule.day, schedule.start_at, schedule.end_at])
  .then(() => {
    res.redirect('/schedules');
  })
  .catch((err) => {
    res.send(err);
  });
});
};
