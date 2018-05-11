'use strict';

const path = require('path');
const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const debug = require('debug');
const uuid = require('uuid/v4');

const logger = debug('mylogger');
logger('Starting app');
const app = express();

app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'data')));
app.use(body.json());
app.use(cookie());


const users = {
    'test@test.test': {
        email: 'test@test.test',
        password: '1234',
        username: 'test',
        score: 1234,
        avatar: 'default.jpg',
    },
    'kek@mail.ru': {
        email: 'kek@mail.ru',
        password: 'password',
        username: 'sadsada',
        score: 72,
        avatar: 'default.jpg',
    },
    'keker@mail.ru': {
        email: 'keker@mail.ru',
        password: 'password',
        username: 'fafad',
        score: 100500,
        avatar: 'default.jpg',
    },
    'yakken@mail.ru': {
        email: 'yakken@mail.ru',
        password: 'password',
        username: 'asds',
        score: 72,
        avatar: 'default.jpg',
    },
    'pupkin@mail.ru': {
        email: 'pupkin@mail.ru',
        password: 'password',
        username: '20',
        score: 72,
        avatar: 'default.jpg',
    },
    'www@mail.ru': {
        email: 'www@mail.ru',
        password: 'password',
        username: '20asda',
        score: 72,
        avatar: 'default.jpg',
    },
};
const ids = {};

app.post('/register', function(req, res) {
    console.log(req);
    const password = req.body.password;
    const email = req.body.email;
    const username = req.body.username;
    if (
        !password || !email || !username ||
        !password.match(/^\S{4,}$/) ||
        !email.match(/@/)
    ) {
        return res.status(400).json({error: 'Не валидные данные пользователя'});
    }
    if (users[email] || users[username]) {
        return res.status(400).json({error: 'Пользователь уже существует'});
    }

    const avatar = req.files.avatar;
    let imgName = avatar.name;
    if (imgName === undefined || imgName === '') {
    } else {
        imgName = 'default.jpg';
    }

    const id = uuid();
    const user = {
        username: username,
        password: password,
        email: email,
        score: 0,
        avatar: imgName,
    };
    ids[id] = email;
    users[email] = user;
    res.cookie(
        'frontend',
        id,
        {expires: new Date(Date.now() + 1000 * 60 * 10)}
    );
    res.status(201).json({id});
});

app.post('/authenticate', function(req, res) {
    console.log(req.body.pass);
    const password = req.body.pass;
    const email = req.body.email;
    if (!password || !email) {
        return res.status(400).json({error: 'Не указан E-Mail или пароль'});
    }
    if (!users[email] || users[email].password !== password) {
        return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
    }

    const id = uuid();
    ids[id] = email;
    res.cookie(
        'frontend',
        id,
        {expires: new Date(Date.now() + 1000 * 60 * 10)}
    );
    res.status(201).json({id});
});

app.get('/get', function(req, res) {
    const id = req.cookies['frontend'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    users[email].score += 1;
    res.json(users[email]);
});

app.get('/get/profile', function(req, res) {
    const id = req.cookies['frontend'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }

    res.json({username: users[email].username,
        email: email, score: users[email].score});
});

app.get('/logout', function(req, res) {
    let id = req.cookies['frontend'];
    const email = ids[id];
    if (!email || !users[email]) {
        return res.status(401).end();
    }
    ids[id] = '';
    res.status(200).json({});
});

app.get('/leaders', function(req, res) {
    logger(req.query);
    const page = Number(req.query.page);
    const countUsers = Number(req.query.size);
    const head = (page - 1) * countUsers;
    console.log(page + ' ' + countUsers);
    let scorelist = Object.values(users).sort((l, r) => r.score - l.score);

    const length = scorelist.length;
    scorelist = scorelist.map((user) => {
        return {
            email: user.email,
            username: user.username,
            score: user.score,
        };
    }).slice(head, head + countUsers);
    console.log(scorelist);
    res.json({scorelist: scorelist, length: length});
});


const port = process.env.PORT || 3000;

app.listen(port, function() {
    logger(`Server listening port ${port}`);
});
