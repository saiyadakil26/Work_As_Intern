const Koa=require('koa')
const {router}=require('./router/main_router')

const app=new Koa()

const Port =process.env.Port || 3000

app.use(router.routes()).use(router.allowedMethods())
app.use(async (ctx) => {
    if(parseInt(ctx.status) === 404){
       ctx.status = 404
       ctx.body = "Oop's Page is Not Available.";
    }
})

app.listen(Port,()=>{
    console.log(`Application Rinnig at http://localhost:${Port}`);
})