const rout = require('koa-router')
const router = new rout()

router.get('/user', async ctx => ctx.body = "Hello")

module.exports=router