
// !-- login Router

const koa_rout = require('koa-router')
const {controler_login} = require('../controler/login')
const model_login=require('../model/login')
const router=new koa_rout()


router.get('/login',(ctx)=>{  // handle get request
    ctx.body="login Page"
})

router.post('/login',model_login,controler_login) // post request 

module.exports=router 