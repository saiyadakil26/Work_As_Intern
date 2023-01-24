const rout=require('koa-router')
const model_validator=require('../models/signup')
const body_parser=require('../body_parser')
const {signup_user,invite_user}=require('../controler/signup')

const router=new rout()

router.get('/signup',async(ctx)=>{
    ctx.body="Hello From Signup get"
})

router.post('/signup',async(ctx)=>{
     try {
        const token_pass = ctx.request.query.id
        const data = await body_parser(ctx.req)
        const valid = await model_validator(data,token_pass)
        const token = await signup_user(valid)
        ctx.res.writeHead(200,"ok")
        ctx.body=`User added Succsessfully Your Authentication Token is ${token}`
    } catch (error) {
        ctx.res.writeHead(400,"Internal Server Error")
        ctx.body=error.toString()
    }
})

router.post('/invite',async(ctx)=>{
    try {
       const token_pass = ctx.request.headers.authorization
       const data = await body_parser(ctx.req)
       await invite_user(token_pass,data)
       ctx.res.writeHead(200,"ok")
       ctx.body=`User Invited Succsessfully`
   } catch (error) {
       ctx.res.writeHead(400,"Internal Server Error")
       ctx.body=error.toString()
   }
})

module.exports=router