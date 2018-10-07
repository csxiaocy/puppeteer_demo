const request = require('request');
const url = 'http://127.0.0.1:3000/login';

/**
 * 并发测试
 */

let p1 = new Promise((resolve, reject) => {
    request.post(url, { form: { username: '', password: '' }});
    resolve();
});

let p2 = new Promise((resolve, reject) => {
    request.post(url, { form: { username: '', password: '' }});
    resolve();
});

let p3 = new Promise((resolve, reject) => {
    request.post(url, { form: { username: '', password: '' } });
    resolve();
});

Promise.all([p1, p2, p3]).then(() => {
    console.log('Three post requests have been sent');
});