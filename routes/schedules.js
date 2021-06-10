const schedulesController = require('../controllers/schedulesController');

module.exports = (app) => {
    app.get('/schedules', schedulesController.index);
  app.get('/schedule/new', schedulesController.newSchedule);

app.post('/schedule/add', schedulesController.addSchedule);
};
