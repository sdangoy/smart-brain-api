const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv-flow').config();

const register = require('./controllers/register');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image.js');

const db = knex({
        client: 'pg',
        connection: {
          host : '127.0.0.1',
          user : process.env.DB_USER,
          password : process.env.DB_PASSWORD,
          database : 'smart-brain'
        }, 
        pool: { min: 0, max: 7 }
});

db.select('*').from('users').then(data => {
    console.log(data);
}).catch(error => {
    console.log(error);
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('success');
})

app.post('/signin', signin.handleSignin(db, bcrypt))

app.post('/register', register.handleRegister(db, bcrypt))

app.get('/profile/:id', profile.handleProfileGet(db))

app.put('/image', image.handleImage(db))

app.listen(3001, () => {
    console.log('app is running on port 3001');
})