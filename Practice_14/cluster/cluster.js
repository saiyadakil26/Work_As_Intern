const os = require('os')
const http = require('http')
const cluster=require('cluster')

let num_of_cpu = os.cpus().length

if(cluster.isPrimary){
    for (let i = 0; i < num_of_cpu; i++) {
       let worker=cluster.fork()
       worker.send(`Hii from worker ${worker.id}`)
    }    
}else{
    process.on('message',(data)=>{
        console.log(data)
    })
    http.createServer((req,res)=>{
        res.end(`HEllo From Node Server with Process ${process.pid}`)
    }).listen(8000)
    console.log(`server Start with Process ${process.pid}`);
}