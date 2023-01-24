const rout=require('koa-router')
const body_parser=require('../body_parser')
const { login_user } = require('../controler/login')
const login_model = require('../models/login')

const router=new rout()

router.get('/login',async(ctx)=>{
    ctx.body="Hello From login get"
})

router.post('/login',async(ctx)=>{
    try {
        const token_pass = ctx.request.headers.authorization
        const data = await body_parser(ctx.req)
        const valid_data = await login_model(data,token_pass)
        const token = await login_user(valid_data)
        ctx.body=`You are login Succsessfuly your Authentication Token is ${token}`
    } catch (err) {
        ctx.res.writeHead(401,"Authentication Fail")
        ctx.body=err.toString()
    }
})

module.exports=router