const rout=require('koa-router')
const body_parser=require('../body_parser')
const group_model = require('../models/group')
const {add_group, get_group} = require('../controler/group')

const router=new rout()

router.get('/group',async(ctx)=>{
    try {
        const token_pass = ctx.request.headers.authorization
        ctx.body=await get_group(token_pass)
    } catch (err) {
        ctx.res.writeHead(400,"Internal server Error")
        ctx.body=err.toString()
    }
})

router.post('/group',async(ctx)=>{
    try {
        const token_pass = ctx.request.headers.authorization
        const data = await body_parser(ctx.req)
        const valid_data = await group_model(data,token_pass)
        await add_group(valid_data)
        ctx.body="Group Added Succsessfuly."
    } catch (err) {
        ctx.res.writeHead(422,"Validation Error")
        ctx.body=err.toString()
    }
})

module.exports=router