const koa = require('koa')
const rout = require('koa-router')
const body_parser=require('koa-bodyparser')
const user_rout=require('./router/user')

const app = new koa()
const router = new rout()

const Port = process.env.Port || 8000

router.get('/', async ctx => ctx.body = "Hello From Saiyad akil")

app.use(body_parser())
app.use(router.routes()).use(router.allowedMethods())
app.use(user_rout.routes()).use(user_rout.allowedMethods())

app.listen(Port, () => {
   console.log(`Application is runnig on ${Port}`);
})