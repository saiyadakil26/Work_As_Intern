const Koa = require('koa') // require koa 
const koa_bodyparser=require('koa-bodyparser') //require body-parser
const router=require('../router/main_router') // required our main router file
require('./connect').db_Connection() // connect Mongodb only when server start

const Port = process.env.Port || 5000 

const app = new Koa()

app.use(koa_bodyparser())
app.use(router.routes()).use(router.allowedMethods()) //register router

app.listen(Port,()=>{
    console.log(`Server is start on http://localhost:${Port}`);
})