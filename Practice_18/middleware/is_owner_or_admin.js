const response_send = require("../config/response")

const is_owner_admin=async(ctx,next)=>{
    let data=ctx.state.user_data
    if (!(data.user_type === 'owner' || data.user_type === 'admin')) {
        response_send(ctx,403,{error:"You dont have permission."})
    }else{
        await next()
    }
}

module.exports=is_owner_admin