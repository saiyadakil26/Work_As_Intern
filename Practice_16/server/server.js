const koa=require('koa')
const koa_bodyparser=require('koa-bodyparser')
const router=require('./router/main_route')
const {createClient}=require('redis')
require('dotenv').config()
require('./config/connection').db_connect()
const socket = require('socket.io')
const app=new koa()
const http = require('http')

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

    const redis = createClient(6379, "127.0.0.1")
    redis.connect()

    redis.on("connection", () => {
      console.log("connected!")
    })

// global.online_member = new Map()

io.on('connection',async (socket)=>{
    // global.chatsocket=socket
    socket.on('joined', ()=>{
        socket.emit("message" , "new User joined")
    })

    socket.on('add-user',async(id)=>{
            socket.owner=id
            let Sockets = await redis.get(id) || JSON.stringify([])
            Sockets=JSON.parse(Sockets)
            Sockets.push(socket.id)
            Sockets=Array.from(new Set(Sockets)) 
            Sockets=JSON.stringify(Sockets)
            await redis.set(id,Sockets)
    })

    socket.on('send-msg',async(data)=>{
        let sendUserSocket= await redis.get(data.to)
        sendUserSocket =JSON.parse(sendUserSocket)
        if (sendUserSocket) {
            for (const i of sendUserSocket) {
                // console.log(i);
                socket.to(i).emit("msg-recieve",data)
            }
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
    socket.on("disconnect", async () => {
        let a=socket.owner || ""
        let listSocket= await redis.get(a)
        listSocket =JSON.parse(listSocket) || []
        listSocket.splice(listSocket.indexOf(socket.id),1)
        listSocket=JSON.stringify(listSocket)
        if (socket.owner) {  
            await redis.set(socket.owner,listSocket)
        }
    });

})

