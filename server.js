const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const { handleRegister } = require('./controllers/Register');
const { handleSignin } = require('./controllers/Signin');
const { handleProfileGet } = require('./controllers/Profile');
const { handleImage, handleApiCall } = require('./controllers/Image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Facerecognition',
        database: 'smart-brain'
    }
});

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('success!');
})

app.post('/signin', (req, res) => { handleSignin(req, res, db, bcrypt) })

app.post('/register', (req, res) => { handleRegister(req, res, db, bcrypt) })

app.get('/profile/:id', (req, res) => { handleProfileGet(req, res, db) })

app.put('/image', (req, res) => { handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { handleApiCall(req, res) })

app.listen(process.env.PORT || 3000, () => {
    console.log(`App is running on port ${process.env.PORT}`);
})