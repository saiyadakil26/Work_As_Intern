const http=require('http')
const Port = process.env.Port || 3000

// console.log(http.METHODS);
// console.log(http.STATUS_CODES);

const server = http.createServer((req,res)=>{
    
    //console.log(req.url);
    //console.log(req.method);

    // res.statusCode=404
    // res.statusMessage="Page not Found"

    //res.writeHead(200,"ok_pratik")
    res.end("Page Not Found")
    }).listen(Port,()=>{
    console.log(`server is running on ${Port}`);
})

// server.close()