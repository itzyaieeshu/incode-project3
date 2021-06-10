const db = require('../config/database');

const getSchedules = () => db.any('SELECT * FROM schedules');
const insertSchedule = (schedule) => db.any('INSERT INTO schedules(user_id, day, start_at, end_at) Values ($1,$2,$3,$4);', [schedule.user_id, schedule.day, schedule.start_at, schedule.end_at]);

module.exports = {
    getSchedules,
    insertSchedule,
};
