const {execFile,exec}=require('child_process')

let file=execFile('command.bat',(err,stdout,stderr)=>{
    if (err) console.log(err);
    else if (stderr) console.log(stderr);
    else console.log(stdout);
})

let command=exec('dir',(err,stdout,stderr)=>{
    if (err) console.log(err);
    else if (stderr) console.log(stderr);
    else console.log(stdout);
})