const response_send = require("../config/response")

const is_owner=async(ctx,next)=>{
    let data=ctx.state.user_data
    if (!(data.user_type === 'owner')) {
        response_send(ctx,403,{error:"You dont have permission."})
    }else{
        await next()
    }
}

module.exports=is_owner