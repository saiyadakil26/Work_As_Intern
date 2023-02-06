const koa_rout=require('koa-router')
const router=new koa_rout()
const signup_router=require('./signup')
const login_router=require('./login')
const chat_router=require('./chat')

router.get('/',(ctx)=>{
    ctx.body="Hello From Chat-App Server"
})

let routers=[signup_router,login_router,chat_router] // array of all routes

for (const i of routers) {
    router.use(i.routes()).use(i.allowedMethods()) // register signup router
}

module.exports=router