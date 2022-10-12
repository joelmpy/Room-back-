require('dotenv').config()
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8005

const cors = require('cors');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Hotel')

const routeur = require('./route/route')
const passport = require('./config/passport')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use('/', routeur)

app.get('/room', (req, res) => {
    res.send('Bonjour')
})

app.listen(PORT, err => {
    if (err) {
        return console.log('ERROR', err)
    }
    console.log(`Listen my port ${PORT}`)
})