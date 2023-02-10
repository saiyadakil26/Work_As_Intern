const response_send = require("../config/response");
const { find } = require("../query/user");

const has_permission=async(ctx,next)=>{
    let data=ctx.state.user_data
    if (!(data.user_type === 'owner' || data.user_type === 'admin' || data.user_type === 'manager')) {
        if (data.permission) await next()
        else response_send(ctx,403,{error:"You dont have permission."})
    }else{
        await next()
    }
}

module.exports=has_permission