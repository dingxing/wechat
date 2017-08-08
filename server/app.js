const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

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
/*router.get('/wechat', async (ctx) => {
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
});*/


// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 装载子路由
router.use('/', home.routes(), home.allowedMethods());

app.listen(3000);
console.log("服务器已经启动");