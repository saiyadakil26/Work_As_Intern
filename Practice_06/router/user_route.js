const rout=require('koa-router')
const {get_user_view,add_user,delete_user, login}=require('../controler/user')

const router=new rout()

router.get('/user/:id',async(ctx)=>{
    let id=ctx.params.id
    ctx.body= await get_user_view(id)
    
})
router.post('/user',async(ctx)=>{
    let post_data=ctx.request.body
    ctx.body= await add_user(post_data)
})
router.delete('/user',async(ctx)=>{
    let Token=ctx.request.header.authorization
    // ctx.request
    ctx.body= await delete_user(Token)
})
router.post('/login',async(ctx)=>{
    let Token=ctx.request.header.authorization
    let post_data=ctx.request.body 
    ctx.body= await login(Token,post_data)
})
module.exports=router