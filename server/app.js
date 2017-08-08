const path = require('path');
const Koa = require('koa');
const app = new Koa();
const Router = require('koa-router');

let router = new Router();
let home = new Router();
let api = new Router();

// 主路由
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

// 子路由
api.get('/', async (ctx, next) => {
    ctx.body = 'api!';
});

api.get('/helloworld', async (ctx, next) => {
    let url = ctx.url;
    let request = ctx.request;
    let req_query = request.query;
    let req_querystring = request.querystring;
    ctx.body = {
        // url,
        // req_query,
        //     req_querystring
        a: 1,
        b: '123'
    }
});

api.get('/404', async (ctx, next) => {
    ctx.body = '404 page!';
});

api.get('/info', async (ctx, next) => {
    ctx.body = 'info page!';
});

api.get('/videourl', async (ctx, next) => {
    console.log("videourl");
    ctx.body = {
        url1: "http://v.youku.com/v_show/id_XMjg0Mzk5NDI3Ng==.html",
        url2: 'http://v.youku.com/v_show/id_XMjg0MDI3MTIzNg==.html'
    }
});

api.get('/cookie', async (ctx, next) => {
    ctx.body = 'cookie';
    ctx.cookies.set(
        'cid',
        'hello world',
        {
            domain: 'localhost',  // 写cookie所在的域名
            path: '/index',       // 写cookie所在的路径
            maxAge: 10 * 60 * 1000, // cookie有效时长
            expires: new Date('2017-02-15'),  // cookie失效时间
            httpOnly: false,  // 是否只用于http请求中获取
            overwrite: false  // 是否允许重写
        }
    )
});

// 加载路由中间件
app.use(router.routes()).use(router.allowedMethods());

// 装载子路由
router.use('/', home.routes(), home.allowedMethods());
router.use('/api', api.routes(), api.allowedMethods());

app.listen(3000);
console.log("服务器已经启动");