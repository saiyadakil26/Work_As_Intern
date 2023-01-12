const cp=require('child_process')

let cmd={
    list:'dir',
    copy:"cp",
    folder:"mkdir"
}

// let child=cp.exec(cmd.list,(err,stdout,stderr)=>{
//     if (err) console.log(err);
//     else console.log(stdout);
// })

// let child=cp.execFile("hello.bat",(err,stdout,stderr)=>{
//     if (err) console.log(err);
//     else console.log(stdout);
// }) 

// let child=cp.fork('hello.js')

// child.on('error',(code,sign)=>{
//     console.log(`Error in Procee  with ${code} code and ${sign} signal`);
// })

// child.on('message',(msg)=>{
//     console.log(`Process Message: ${msg}`);
// })

// child.on('exit',(code,sign)=>{
//     console.log(`Procee end with ${code} code and ${sign} signal`);
// })

// let int=setInterval(()=>{
//     child.send({name:"Akil",age:19})
// },1000)

// setTimeout(()=>{
// clearInterval(int)
// child.kill()
// },5000)



// let child = cp.spawn('dir',{shell: true})

// child.stdout.on('data',(data)=>{
//     console.log(data.toString());
// })


let child=cp.spawn("node hello.js",{shell:true,detached:true,stdio:"ignore"})
child.unref()






// const {spawn}=require('child_process')

// const child=spawn('ls',['-lh'])

// child.on('exit',function(code,sign){
//     console.log(`exit with ${code} code and ${sign} signal`);
// })

// child.on('error',(err)=>{
//     console.log(err);
// })

// const { exec } = require("child_process");
// // Run this in git bash
// // execute the given command and give the output of it
// exec("dir", (error, stdout, stderr) => {
//     if (error) {
//         // if command is not executed then give error On success it will null
//         return console.log("Error:", error.message); // con failure contain instance of Error
//     }
//     if (stderr) {
//         // If command is executed but error occured in shell then give that err
//         return console.log(`stderr: ${stderr}`);
//     }
//     console.log(stdout); // give output
// });