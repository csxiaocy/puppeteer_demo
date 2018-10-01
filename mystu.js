const puppeteer = require('puppeteer');

// 爬 mystu
const loginUrl = 'https://sso.stu.edu.cn/login?service=https%3A%2F%2Fmy.stu.edu.cn%2Fv3%2F';

const checkUrl = 'https://sso.stu.edu.cn/login';

// 输入账号
var username = '17cyxiao';
// 输入密码
var password = '';


function login(username, password) {

    const message = [
        {retcode: '010101', msg:'登录成功'},
        {retcode: '010102', msg:'未连接网络'},
        {retcode: '010103', msg:'账号/密码错误'},
        {retcode: '010104', msg:'网络连接超时'}
    ]

    let p1 = new Promise((resolve, reject) => {
        
        puppeteer.launch().then(async browser => {

            const page = await browser.newPage();
            try{
                await page.goto(loginUrl);

                console.time();
                await page.type('#username', username);
                await page.type('#password', password);

                const [response] = await Promise.all([
                    page.waitForNavigation(),
                    page.click('.login-button'),
                ]);

                if (page.url().indexOf(checkUrl) == -1) {
                    // console.log('登录成功');
                    resolve(message[0])
                } else {
                    // console.log('账号不存在或密码错误');
                    resolve(message[2])
                };
                console.timeEnd();
            } catch(err) {
                resolve(message[1])
            }
            await browser.close();
        })

    });

    let p2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 5000, message[3]);
    });

    return Promise.race([p1, p2])
        .then(value => {
            return value;
        })
}

//调用函数
login(username, password).then(value => {
	console.log(value);
});