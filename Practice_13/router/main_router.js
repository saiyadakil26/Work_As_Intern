const rout=require('koa-router')
const signup=require('./signup')
const login=require('./login')
const router=new rout()

router.get('/',async(ctx)=>{
    ctx.body="Hello From Server Side"
})

router.use(signup.routes()).use(signup.allowedMethods())
router.use(login.routes()).use(login.allowedMethods())

module.exports={router}