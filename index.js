const express = require('express')

const app = express()
var data = require('./data')

const port = 3000

app.get('/', (req, res) => {
    res.send('Welcome to our schedule website');
})
app.get('/users', (req, res) => {
    res.send(data.users);
})
app.get('/schedules', (req, res) => {
    res.send(data.schedules);
})
app.get('/users/:id', (req, res) => {
    res.send(data.users[req.params.id])
})
app.get('/users/:id/schedules', (req, res) => {
    res.send(data.schedules)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})