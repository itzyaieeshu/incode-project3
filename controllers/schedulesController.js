const usersModel = require('../models/users');
const schedulesModel = require('../models/schedules');

const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const time = ['12AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM',
'12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM'];

const index = (req, res) => {
  schedulesModel
    .getSchedules()
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
};
const newSchedule = (req, res) => {
  usersModel
    .getUsers()
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
};
const addSchedule = (req, res) => {
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
  schedulesModel
    .insertSchedule(schedule)
    .then(() => {
      res.redirect('/schedules');
    })
    .catch((err) => {
      res.send(err);
    });
};
module.exports = {
  index,
  newSchedule,
  addSchedule,
};
