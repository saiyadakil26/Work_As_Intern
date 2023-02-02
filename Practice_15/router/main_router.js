
// ! This is our main Router File from here different router are seprated

const koa_rout=require('koa-router') 
const router=new koa_rout()

const signup_router=require('./signup') // seprate signup router
const login_router=require('./login') // seprate login router
const invite_router=require('./invite') // seprate login router
const group_router=require('./group') // seprate group router

router.get('/',(ctx)=>{  //default router
    ctx.body="<b>Hello From SocialPilot ! </b>"
})

let routers=[signup_router,login_router,invite_router,group_router] // array of all routes

for (const i of routers) {
    router.use(i.routes()).use(i.allowedMethods()) // register signup router
}

module.exports=router // export our router