const response_send = require("../config/response");
const { find } = require("../query/user");

const has_permission=(...arr)=>async(ctx,next)=>{
    let data=ctx.state.user_data
    let user_type=data.user_type[0]
    if (!(arr.includes(user_type))) {
        if (user_type=="c" && data.permission) await next()
        else response_send(ctx,403,{error:"You dont have permission."})
    }else{
        await next()
    }
}

module.exports=has_permission