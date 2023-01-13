const http=require('http')
const router=require('./router/router')

const Port=process.env.Port || 3000

const server = http.createServer(router)

server.listen(Port,()=>{
    `Application run http://localhost:${Port}/`
})