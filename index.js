const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const mystu = require('./mystu');
const credit = require('./credit');
const morgan = require('morgan');

const urlencodedParser = bodyParser.urlencoded({ extended: true });
// HTTP请求体解析中间件
app.use(bodyParser.json({ limit: '1mb' }));

// 打印日志中间件
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res) + 'ms'
    ].join('   ');
}));

app.post('/login', urlencodedParser, function (req, res) {

    let username = req.body.username;
    let password = req.body.password;

    // mystu(username, password).then(value => {
    //     console.log(value);
    //     res.send(value);
    //     res.end();
    // });

    credit(username, password).then(value => {
        console.log(value);
        res.send(value);
        res.end();
    });
});

app.listen(3000);