const router = require('./koa')

const login_rout = require('./login')
const signup_rout = require('./signup')
const invite_rout = require('./invite')
const blog_rout=require('./blog')
const comment_rout=require('./comment')

const arr_rout=[login_rout,signup_rout,invite_rout,blog_rout,comment_rout]

for (const i of arr_rout) {
    router.use(i.routes()).use(i.allowedMethods())
}

router.get('/',async(ctx)=>ctx.body="Hello From Server")

module.exports=router