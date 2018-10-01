const puppeteer = require('puppeteer');

// 爬学分制
const url = 'http://credit.stu.edu.cn/english/setlocale.aspx?locale=zh-cn';

// 输入账号
var username = '17cyxiao';
// 输入密码
var password = '';


function login(username, password) {

    const message = [
        { retcode: '010101', msg: '登录成功' },
        { retcode: '010102', msg: '未连接网络或未连接内网' },
        { retcode: '010103', msg: '账号/密码错误' },
        { retcode: '010104', msg: '网络连接超时' }
    ]

    let p1 = new Promise((resolve, reject) => {

        puppeteer.launch().then(async browser => {

            const page = await browser.newPage();
            try {
                await page.goto(url);
                const loginUrl = await page.url();

                console.time();
                await page.type('#txtUserID', username);
                await page.type('#txtUserPwd', password);

                await page.click('#btnLogon');
                await page.waitFor(500);

                const loginedUrl = await page.url();

                if (loginUrl != loginedUrl) {
                    resolve(message[0])
                } else {
                    resolve(message[2])
                };

                console.timeEnd();

            } catch (err) {
                resolve(message[1])
            }
            await browser.close();
        })

    });

    let p2 = new Promise((resolve, reject) => {
        setTimeout(resolve, 7000, message[3]);
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