const rout=require('koa-router')
const router=new rout()

router.get('/login',async(ctx)=>{
    ctx.body="Hello From login get"
})

router.post('/login',async(ctx)=>{
    ctx.body="Hello From login post"
})

module.exports=router