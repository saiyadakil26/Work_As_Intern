const router = require('./koa')
const model_login = require('../model/login')
const {controler_login}=require('../controler/login')

router.get('/login',async(ctx)=>ctx.body="Hello From login")

router.post('/login',model_login,controler_login) // post request 

module.exports=router