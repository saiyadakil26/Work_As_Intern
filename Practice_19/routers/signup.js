const { controler_signup } = require('../controler/signup')
const { model_signup } = require('../model/signup')
const router = require('./koa')

router.get('/signup',async(ctx)=>ctx.body="Hello From signup")
router.post('/signup',model_signup,controler_signup)

module.exports=router