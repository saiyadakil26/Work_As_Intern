const { read } = require('fs');
const stream=require('stream')

// const readstream=new stream.Readable({
//     read(){}
// })

// readstream.push('hello')
// readstream.push('akil')
// readstream.push('saiyad')
// readstream.push(null)

// readstream.pipe(process.stdout)

const writstream=new stream.Writable({
    write(chunk,encoding,cb){
        console.log(chunk.toString());
        cb()
    }
})

process.stdin.pipe(writstream)