const Koa = require('koa');
const app = new Koa();
const _ = require('koa-route');
const bodyParser = require('koa-bodyparser')
const task = require('./controllers/task')

app.use(bodyParser())
app.use(_.post('/task/newTask', task.newTask));

app.listen(3000);
