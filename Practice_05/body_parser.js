const body_parser=(req)=>{
    let data=""
    return new Promise((res,rej)=>{
        req.on('data',(chunk)=>{
            data+=chunk
        })
        req.on('end',()=>{
            res (data)
        })
    })
}

module.exports=body_parser