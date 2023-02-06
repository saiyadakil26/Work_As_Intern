const koa=require('koa')
const koa_bodyparser=require('koa-bodyparser')
const router=require('./router/main_route')
const cors=require('cors')
require('dotenv').config()
require('./config/connection').db_connect()
const socket = require('socket.io')
const app=new koa()


const Port=process.env.Port || 7000
app.use(koa_bodyparser())
app.use(router.routes()).use(router.allowedMethods())

const server=app.listen(Port,()=>{
    console.log(`server is running on http://localhost:${Port}/`);
})

// Socket code
const io = socket(server,{
    cors:{
        origin:"*",
        credentials:true
    }
})

global.online_member = new Map()

io.on('connection',(socket)=>{

    global.chatsocket=socket

    socket.on('add-user',(id)=>{
        online_member.set(id,socket.id)
    })

    socket.on('send-msg',(data)=>{
        const sendUserSocket=online_member.get(data.to)
        if (sendUserSocket) {
            socket.to(sendUserSocket).emit("msg-recieve",data)
        }
    })

    socket.on('join_room',(data)=>{
        socket.join(data)
    })
    socket.on('group-msg',(data)=>{
        socket.join(data.room)
        socket.to(data.room).emit('msg-group',data)
    })
    socket.on('global-msg',(data)=>{
        socket.broadcast.emit('message',data)
    })
})
