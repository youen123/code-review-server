const Koa = require('koa');
const app = new Koa();
const _ = require('koa-route');
const bodyParser = require('koa-bodyparser')
const task = require('./controllers/task')
const user = require('./controllers/user')
const diff = require('./controllers/diff')
const session=require('koa-session');
const logger = require('koa-logger')

const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
};
app.use(handler);

app.use(bodyParser())

app.use(async (ctx, next) => {
  if (ctx.path === '/user/login') {
    await next();
    return;
  }
  if (ctx.cookies.get('username') === '') {
    // 未登录，直接返回
    console.log('bad request!');
    ctx.response.body = { flag: false, data: null , msg: '请先登录！'}
  } else {
    await next();
  }
})

app.use(async (ctx, next) => {
  console.log('log: ', ctx.path, ctx.cookies.get('username'), new Date()); 
  await next();
})

app.use(_.post('/task/newTask', task.newTask));
app.use(_.get('/task/getTasks', task.getTaskList))
app.use(_.get('/task/getTaskDetail', task.getTaskDetail));
app.use(_.post('/task/closeTask', task.closeTask))
app.use(_.post('/user/login', user.login))
app.use(_.post('/user/logout', user.logout))
app.use(_.get('/diff/getDiffFileListOfSameBranch', diff.getDiffFileListOfSameBranch));
app.use(_.get('/diff/getDiffFileHTML', diff.getDiffFileHTML));

app.use(session({
  key: 'koa:sess', /** cookie的名称，可以不管 */
  maxAge: 7200000, /** (number) maxAge in ms (default is 1 days)，cookie的过期时间，这里表示2个小时 */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
},app));

app.listen(3000);
