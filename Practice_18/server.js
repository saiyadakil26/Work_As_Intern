const Koa = require('koa')
const router=require('./routes/main_route')
koa_bodyparser=require('koa-bodyparser')
require('dotenv').config()
require('./config/connection').db_connect()
const app= new Koa()

app.use(koa_bodyparser())
app.use(router.routes()).use(router.allowedMethods())

const Port = process.env.Port || 8000

app.listen(Port,()=>{
    console.log(`Server is start on http://localhost:${Port}`);
})