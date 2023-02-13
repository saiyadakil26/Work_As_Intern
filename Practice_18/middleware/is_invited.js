const response_send = require("../config/response")
const { find } = require("../query/user")

const is_invited=async(ctx,next)=>{
    let data=ctx.request.body
    const owner_data=ctx.state.user_data

    if (data.username===owner_data.email) {
        response_send(ctx,403,{error:"You can't Update Yourself."})
    }else{

        let res=await find({email:data.username})
        let invited_list=res[0].role

        let is_member=invited_list.filter((el)=>{if(el.email==owner_data.email) return el})

        if (is_member.length == 0 ) {
            response_send(ctx,403,{error:"It's Not Your Buddy."})
        }else{
            await next()
        }
    }
}

module.exports=is_invited