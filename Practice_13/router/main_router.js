const rout=require('koa-router')
const signup=require('./signup')
const login=require('./login')
const group=require('./group')
const router=new rout()

router.get('/',async(ctx)=>{
    ctx.body="Hello From SocialPilot !"
})

router.use(signup.routes()).use(signup.allowedMethods())
router.use(group.routes()).use(group.allowedMethods())
router.use(login.routes()).use(login.allowedMethods())

module.exports={router}