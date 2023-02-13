const { controler_login } = require('../controler/login')
const model_login = require('../model/login')
const router = require('./koa')

router.get('/login',async(ctx)=>ctx.body="Hello From login")

router.post('/login',model_login,controler_login) // post request 

module.exports=router