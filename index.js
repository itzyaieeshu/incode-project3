const express = require('express')

const app = express()
var data = require('./data')

const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

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
app.post('/users', (req, res) => {
    data.users.push(req.body)
    res.send(data.users)
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})