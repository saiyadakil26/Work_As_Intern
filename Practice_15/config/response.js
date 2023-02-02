const response_send=(ctx,code,body)=>{
    ctx.status=code
    ctx.body=body
}

module.exports=response_send