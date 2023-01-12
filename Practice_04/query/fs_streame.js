const fs=require('fs')

const writestream=fs.createWriteStream('data.txt')

for (let i = 0; i <=1000; i++) {
    writestream.write(`line Number ${i} \n`,()=>{
        console.log(`line Number ${i}`);
    })
}

const readstream=fs.createReadStream('data.txt')

readstream.on('data',(chunk)=>{
    console.log(chunk.toString());
})
