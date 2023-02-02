const send_mail = require("../common_function/send_mail")
const response_send = require("../config/response")
const { generate_token } = require("../validator/generate_token")

const invite_user=async(ctx,next)=>{

    let {user_data} = ctx.state
    let invited_data= ctx.request.body

    try {
        let tokendata={...invited_data,owner_email:user_data.email}
        let token = await generate_token(ctx,tokendata)
        let subject=`You are Invited At SocialPilot By ${user_data.email}`
        let text= `http://localhost:5000/signup?id=${token}`
        let succsess=send_mail(subject,text,invited_data)
        if (succsess || true) {
            response_send(ctx,200,{msg:"User Invited Succsessfully",invite_link:text})
        }else{
            response_send(ctx,200,{error:"Error when sendng Mail"})
        }

    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }
    
}

module.exports={invite_user}