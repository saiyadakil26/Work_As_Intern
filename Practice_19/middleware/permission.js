const response_send = require("../config/response")

const permission= (arr_role)=> async (ctx,next)=>{
    let role=ctx.request.body?.role
    if(arr_role.includes(role)) return await next()
    else response_send(ctx,401,{"error":"You don't have permission"})
}

module.exports=permission