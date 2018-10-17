const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const fs = require('fs');
// const mystu = require('./mystu');
// const credit = require('./credit');
const getCourses = require('./course');
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

// let username;
// let password;

// app.get('/', function (req, res) {
//     fs.readFile('index.html', 'utf-8', function (err, data) {
//         if (err) {
//             throw err;
//         }
//         res.end(data);
//     });
// });

// app.post('/login', urlencodedParser, function (req, res) {

//     let username = req.body.username;
//     let password = req.body.password;

//     // mystu(username, password).then(value => {
//     //     console.log(value);
//     //     res.send(value);
//     //     res.end();
//     // });

//     credit(username, password).then(value => {
//         console.log(value);
//         res.send(value);
//         res.end();
//     });
// });

app.post('/course', urlencodedParser, function (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let yearValue = req.body.yearValue;
    let semesterIndex = req.body.semesterIndex;
    getCourses(username, password, yearValue, semesterIndex).then(value => {
        res.send(value);
        res.end();
    });
});

app.listen(3000);