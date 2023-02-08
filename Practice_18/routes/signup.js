const router = require('./koa')
const {model_signup}=require('../model/signup')
const {controler_signup}=require('../controler/signup')

router.get('/signup',async(ctx)=>ctx.body="Hello From signup")
router.post('/signup',model_signup,controler_signup) // post request 

module.exports=router