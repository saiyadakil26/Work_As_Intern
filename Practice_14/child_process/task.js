const task=()=>{
    for (let i = 0; i < 1000; i++) {
        process.send(i)  
    }
}

process.on('message',(msg)=>{
    console.log(msg);
})
task()