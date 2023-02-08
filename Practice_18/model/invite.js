const response_send = require("../config/response")
const {is_email}=require('../validator/email_password_mobile')
const model_invite = async (ctx,next)=>{
    let {username:email,user_type}=ctx.request.body
    // console.log(ctx.request.body);
    let err=[]
    if (!(email) && !(user_type)) {
        err.push("Provide required Information")
    }else{
        if (!is_email(email)) {
            err.push("Wrong E-mail")
        }
        if (!(["admin","manager","cs"].includes(user_type))) {
            err.push("Wrong User Type")
        }
    }
    if (err.length != 0) {
       response_send(ctx,403,{error:err}) 
    }
    else{
        await next()
    }
}

module.exports=model_invite