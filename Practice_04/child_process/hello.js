// new Error("Generate error")
//  process.send("Hello from another File");

// process.on('message',(msg)=>{
//     console.log(msg);
// })


let c=0
for (let i = 0; i < 1000000000; i++) {
    c++;
}
console.log(c);