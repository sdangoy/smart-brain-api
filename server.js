const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
require('dotenv-flow').config();

console.log(process.env.TEST);

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
    res.send(database.users);
})

app.post('/signin', (req,res) => {
    if (req.body.email === database.users[0].email && 
        req.body.password === database.users[0].password) {
            res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req,res) => {
    const { email, name } = req.body;
    db('users')
        .returning('*')
        .insert({
            email: email,
            name: name,
            joined: new Date()
        })
    .then(user => {
        res.json(user[0]);
    })
    .catch(err => res.status(400).json('Unable to register.'))
})

app.get('/profile/:id', (req,res) => {
    const { id } = req.params;
    db.select('*').from('users').where({id})
        .then(user => {
            if (user.length) {
                res.json(user[0]);
            } else {
                res.status(400).json('Not found')
            }
    })
    .catch(err => res.status(400).json('Error getting user'))
})

app.put('/image', (req,res) => {
    const { id } = req.body;
    db('users').where('id', '=', id)
        .increment('entries', 1)
        .returning('entries')
        .then(entries => {
            res.json(entries[0]);
        })
        .catch(err => res.status(400).json('Unable to get entries'))
})

app.listen(3001, () => {
    console.log('app is running on port 3001');
})