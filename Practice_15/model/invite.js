const response_send = require("../config/response")
const {is_email}=require('../validator/email_password_mobile')
const model_invite =(ctx,next)=>{
    let {email,user_type}=ctx.request.body
    let err=[]
    if (!(email) || !(user_type)) {
        err.push("Provide required Information")
    }
    if (!is_email(email)) {
        err.push("Wrong E-mail")
    }
    if (!(["admin","teammet","client"].includes(user_type))) {
        err.push("Wrong User Type")
    }
    if (err.length != 0) {
       response_send(ctx,403,{error:err}) 
    }
    else{
        next()
    }
}

module.exports=model_invite