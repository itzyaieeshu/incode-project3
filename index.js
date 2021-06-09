const express = require('express');
// const bcrypt = require('bcrypt');
// const saltRounds = 10;

const app = express();
const data = require('./data');

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/schedules')(app);

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
app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
