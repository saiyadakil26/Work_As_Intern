
// !-- Signup Router

const koa_rout = require('koa-router')
const model_signup = require('../model/signup')
const {controler_signup,show_user}=require('../controler/signup')

const router=new koa_rout()


router.get('/api/signup',(ctx)=>{  // handle get request
    ctx.body="signup Page"
})

router.post('/api/signup',model_signup,controler_signup) // post request 

router.get('/api/alluser',show_user)

module.exports=router 