
// !-- Signup Router

const koa_rout = require('koa-router')
const model_signup = require('../model/signup')
const {controler_signup}=require('../controler/signup')

const router=new koa_rout()


router.get('/signup',(ctx)=>{  // handle get request
    ctx.body="signup Page"
})

router.post('/signup',model_signup,controler_signup) // post request 

module.exports=router 