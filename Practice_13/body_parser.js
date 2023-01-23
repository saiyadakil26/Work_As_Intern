const body_parser =(req)=>{
    let data=""
    return new Promise((res,rej)=>{
        req.on('data',(chunk)=>{
            data+=chunk
        })
        req.on('end',()=>{
            res(data)
        })
        req.on('error',()=>{
            rej("Error : When read data")
        })
    })
}
module.exports=body_parser