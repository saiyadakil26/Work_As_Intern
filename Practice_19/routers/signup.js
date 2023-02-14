const { controler_signup, signup, update_profile } = require('../controler/signup')
const auth = require('../middleware/authentication')
const { model_signup } = require('../model/signup')
const router = require('./koa')

router.get('/signup',async(ctx)=>ctx.body="Hello From signup")
router.post('/signup',model_signup,signup)
router.post('/invite_signup',model_signup,controler_signup)

router.put('/update_prof',auth,model_signup,update_profile)

module.exports=router