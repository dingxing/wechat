const Koa = require('koa');
const co = require('co');
const fs = require('fs');
const request = require('co-request');
const app = new Koa();
const Router = require('koa-router');
var WechatAPI = require('wechat-api');
var wechat = require('koa-wechat');

/*exports.init = function (app) {
    app.use(wechat({token: 'your token'}));
    app.use(Router.post('/api/wechat', postFun));
};

//因为服务器多进程，故需要保存token到全局，其他参见wechat-api文档
var api = new WechatAPI('appid', 'appsecret', function (callback) {
    // 传入一个获取全局token的方法
    fs.readFile('access_token.txt', 'utf8', function (err, txt) {
        if (err) {
            return callback(err);
        }
        callback(null, JSON.parse(txt));
    });
}, function (token, callback) {
    // 请将token存储到全局，跨进程、跨机器级别的全局，比如写到数据库、redis等
    fs.writeFile('access_token.txt', JSON.stringify(token), callback);
});

var weixin = {
    appid: 'appid',
    appsecret: 'appsecret',
    prefix: 'https://api.weixin.qq.com/cgi-bin/',
    mpPrefix: 'https://mp.weixin.qq.com/cgi-bin/',
    fileServerPrefix: 'http://file.api.weixin.qq.com/cgi-bin/',
    payPrefix: 'https://api.weixin.qq.com/pay/',
    merchantPrefix: 'https://api.weixin.qq.com/merchant/',
    customservicePrefix: 'https://api.weixin.qq.com/customservice/'
};

//这里是在最初的时候运行下创建一个'access_token.txt，（因为在设置token为全局后总是不成功，怀疑初始化没有获取token）有更好的办法可以交流
function* getAccessToken() {
    console.log("getAccessToken start");
    var url = weixin.prefix + 'token?grant_type=client_credential&appid=' + weixin.appid + '&secret=' + weixin.appsecret;
    var response = yield request.get(url);
    var result = JSON.parse(response.body);
    console.log('result', result);
    weixin.token = result.access_token;
    console.log("token", weixin.token);
    return weixin.token;
}

function* postFun(next) {
    console.log("**************postFun***********");
    var info = this.req.body
    console.log("postFun info", info);
    console.log("info raw", info.raw);
    if (info.type === 'text') {
        if (info.raw.Content == '你好') {
            this.body = {
                content: '你好',
                type: 'text'
            }
        } else {
            this.body = {
                type: "music",
                content: {
                    title: "什么都不说了,来段音乐吧",
                    description: "一路上有你",
                    musicUrl: "http://www.xxxxx.com/yilushangyouni.mp3",
                    hqMusicUrl: "http://www/yilushangyouni.mp3",
                    thumbMediaId: "thisThumbMediaId"
                }
            }
        }
    } else if (info.type === 'event') {
        if (info.raw.Event === 'subscribe') { //添加关注事件
            console.log("用户：" + info.uid + "新添加了关注");
            this.body = {
                content: '你好,欢迎',
                type: 'text'
            };
        } else {
            console.log('event::', info.raw);
        }
    } else {
//经试验这个是有问题的，实际是没法播放的，估计是需要上传到微信服务器
        this.body = {
            type: "music",
            content: {
                title: "什么都不说了,来段音乐吧",
                description: "一路上有你",
                musicUrl: "http://sc.111ttt.com/up/mp3/239837/2DF7A5657F60BE1DEF33B8DC3EA42492.mp3",
                hqMusicUrl: "http://sc.111ttt.com/up/mp3/239837/2DF7A5657F60BE1DEF33B8DC3EA42492.mp3",
                thumbMediaId: "thisThumbMediaId"
            }
        }
    }
    console.log("************** postFun end ***********");
}

var menu = {
    "button": [{
        "name": "父按钮",
        "sub_button": [{
            "type": "view",
            "name": "子按钮",
            "url": "http://www."
        }, {
            "type": "view",
            "name": "子按钮",
            "url": "http://www."
        }, {
            "type": "view",
            "name": "子按钮",
            "url": "http:/"
        }]
    }, {
        "name": "父按钮",
        "sub_button": [{
            "type": "view",
            "name": "子按钮",
            "url": "http:"
        }, {
            "type": "view",
            "name": "子按钮",
            "url": "http:"
        }]
    }, {
        "name": "父按钮",
        "sub_button": [{
            "type": "view",
            "name": "关于我",
            "url": "http:"
        }, {
            "type": "view",
            "name": "遇到我",
            "url": "http:"
        }, {
            "type": "view",
            "name": "联系我们",
            "url": "http:"
        }]
    }]
}

//创建菜单函数，只为了试验有效性，更多API参考官方文档
function* appMenu() {
    console.log('appMenu start');
    yield api.createMenu(menu, function (err, result) {
        if (err) {
            throw err
        }
        ;
        console.log('appMenu', result);
    });
    console.log('appMenu end');
}

//只是为了试验而执行了一下，自己根据需要执行
co(appMenu());*/

let home = new Router();
let router = new Router();

home.get('/', async (ctx) => {
    let html = `
    <ul>
      <li><a href="/api/">/api</a></li>
      <li><a href="/api/helloworld">/api/helloworld</a></li>
      <li><a href="/api/404">/api/404</a></li>
      <li><a href="/api/info">/api/info</a></li>
      <li><a href="/api/videourl">/api/videourl</a></li>
      <li><a href="/api/cookie">/api/cookie</a></li>
    </ul>
  `;
    ctx.body = html
});
router.get('/wechat', async (ctx) => {
    // 获取微信的请求,注意是 get
    var signature = this.query.signature;
    var echostr = this.query.echostr;
    var timestamp = this.query.timestamp;
    var nonce = this.query.nonce;

    // 这里的token 要和你表单上面的token一致
    var token = 'MMDBB';


    // 根文档上面的,我们需要对这三个参数进行字典序排序
    var arr = [token, timestamp, nonce];
    arr.sort();
    var tmpStr = arr.join('');

    // 排序完成之后,需要进行sha1加密, 这里我们使用node.js 自带的crypto模块
    var sha1 = crypto.createHash('sha1');
    sha1.update(tmpStr);
    var resStr = sha1.digest('hex');
    console.log(signature, 'resStr: ', resStr);

    // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信,
    // 如果匹配,返回echoster , 不匹配则返回error
    if (resStr === signature) {
        this.body = echostr;
    } else {
        return false;
    }
});


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 装载子路由
router.use('/', home.routes(), home.allowedMethods());

app.listen(3000);
console.log("服务器已经启动");