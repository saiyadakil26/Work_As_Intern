const router = require('./koa')

const signup_rout = require('./signup')
const login_rout = require('./login')
const invite_rout = require('./invite')
const blog_rout=require('./blog')
const comment_rout=require('./comment')

router.get('/',async(ctx)=>ctx.body="Hello From SocialPilot")

const arr_rout=[signup_rout,login_rout,invite_rout,blog_rout,comment_rout]

for (const i of arr_rout) {
    router.use(i.routes()).use(i.allowedMethods())
}

module.exports=router