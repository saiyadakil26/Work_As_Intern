const {is_email,is_strong_pass}=require('../validator/email_password_mobile')
const response_send=require('../config/response')

const model_login = async(ctx,next)=>{
    let {username,password,account}=ctx.request.body // get data
try {
    username=username && username.trim().toLowerCase()  //trim value
    password= password && password.trim() 
    let err=[] // error message

    if (!(username && password)) { // both values not be undefine
        err.push("Fill required Information")
    }
    else{
        if (!is_email(username)) { // username is valid or not
            err.push("Username is Invalid")
        }
        if (!is_strong_pass(password)) { // password is strong or not
            err.push("Password is Invalid")
        }
    }
    if (err.length != 0) {
        response_send(ctx,403,{error:err}) // In case of error in validation
    }
    else{
        ctx.request.body={email:username,password,account}
        await next() // pass to next middlewear
    }

} catch (error) {
    response_send(ctx,403,{error:error.toString()}) // In case of error
}
  
}

module.exports=model_login