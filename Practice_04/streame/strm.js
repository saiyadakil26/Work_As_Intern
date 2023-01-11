const stream=require('stream')

// const readstream=new stream.Readable()

// readstream.push('hello')
// readstream.push('akil')
// readstream.push('saiyad')
// readstream.push(null)

// readstream.pipe(process.stdout)

const writstream=new stream.Writable({
    write(chunk){
        console.log(chunk.toString());
    }
})

process.stdin.pipe(writstream)