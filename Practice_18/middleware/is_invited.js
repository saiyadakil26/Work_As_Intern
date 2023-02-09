const response_send = require("../config/response")
const { find } = require("../query/user")

const is_invited=async(ctx,next)=>{
    let data=ctx.request.body
    const owner_data=ctx.state.user_data
    if (data.username===owner_data.email) {
        response_send(ctx,403,{error:"You can't Update Yourself."})
    }else{
        let res=await find({email:owner_data.email})
        let invited_list=res[0].invited_user
        let is_member=invited_list.includes(data.username)
        if (!is_member) {
            response_send(ctx,403,{error:"It's Not Your Buddy."})
        }else{
            await next()
        }
    }
}

module.exports=is_invited