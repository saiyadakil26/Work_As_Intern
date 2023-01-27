const { fork } = require('child_process');
// const task=require('./task')

let fork_var=fork("task.js")

fork_var.on('message',(msg)=>{
    console.log(msg);
})

setInterval(()=>{
    fork_var.send("Take a Break.")
},1000)