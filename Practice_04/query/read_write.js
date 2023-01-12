const fs=require('fs')

fs.readFile('file.mp4',(err,data)=>{
    console.log(data);
})

console.log("Hello");

fs.unlink('file.mp4',()=>{
    console.log("file deleted");
});