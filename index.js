const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const getCourses = require('./course');
const getClassmates = require('./classmate');

app.use(bodyParser());
app.use(async ctx => {

    if (ctx.url === '/credit' && ctx.method === 'POST') {
        let data = ctx.request.body;
        let username = data.username;
        let password = data.password;
        let years = data.years;
        let semester = data.semester;
        await getCourses(username, password, years, semester).then(value => {
            let result = { 'classes': value };
            ctx.body = result;
        }).catch(value => {
            ctx.body = value;
        });
    }

    if (ctx.url === '/member' && ctx.method === 'POST') {
        let class_id = ctx.request.body.class_id;
        await getClassmates(class_id).then(result => {
            ctx.body = result;
        });
    }

});

app.listen(3000);
