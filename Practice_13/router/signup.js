const rout=require('koa-router')
const model_validator=require('../models/signup')
const body_parser=require('../body_parser')
const {signup_user}=require('../controler/signup')

const router=new rout()

router.get('/signup',async(ctx)=>{
    ctx.body="Hello From Signup get"
})

router.post('/signup',async(ctx)=>{
    try {
        const data = await body_parser(ctx.req)
        const valid = await model_validator(data)
        await signup_user(valid)
        ctx.res.writeHead(200,"ok")
        ctx.body="User added Succsessfully"
    } catch (error) {
        ctx.res.writeHead(400,"Internal Server Error")
        ctx.body=error.toString()
    }
})

module.exports=router