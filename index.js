const express = require('express');
require('dotenv').config();

const app = express();

const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

require('./routes/index')(app);
require('./routes/users')(app);
require('./routes/schedules')(app);

app.listen(port, () => {
  console.log(`Mr.coffee app listening at http://localhost:${port}`);
});
