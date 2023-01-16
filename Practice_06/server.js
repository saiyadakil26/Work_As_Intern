const koa=require('koa')
const rout=require('koa-router')
const koa_json=require('koa-json')
const koa_body_parser=require('koa-bodyparser')
const user_route=require('./router/user_route')

const fs=require('fs')

const app=new koa();
const router=new rout()

const Port=3000

app.use(koa_json())
app.use(koa_body_parser())

// app.use(async ctx=> ctx.body={msg:"Hello From Koa"})

data=fs.readFileSync('db.json')

router.get('/',async(ctx)=>{
    ctx.body=JSON.parse(data)
})

router.use(user_route.routes()).use(user_route.allowedMethods())
app.use(router.routes()).use(router.allowedMethods())

app.listen(Port,()=>{
    `Application is Running on ${Port}`
})