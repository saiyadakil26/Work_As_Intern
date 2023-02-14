const response_send = require("../config/response")
const { find } = require("../query/user")
const {is_email}=require('../validator/email_password_mobile')
const type_validator=require('../validator/type_validator')
const uuid = require('uuid')

const model_invite = async (ctx,next)=>{
    let {username:email,user_type,permission}=ctx.request.body
    let owner_data=ctx.state.user_data
    let err=[]
    if (!email) {
        err.push("Provide required Information")
    }else{
        if (!is_email(email)) {
            uuid.validate(email) ? " " :err.push("Wrong E-mail")
        }
        if ( user_type && !(["admin","manager","cs"].includes(user_type))) {
            err.push("Wrong User Type")
        }
        if (permission) {
            let res=await find({_id:email})
            let role=res[0]?.role || []
            let [obj_role]=role.filter((el)=>{if(el.owner_id==owner_data.owner) return el})
            if (!( obj_role?.type == 'cs')) {
                err.push("User Is not CS")
            }
        }
    }
    if (err.length != 0) {
       response_send(ctx,403,{error:err}) 
    }
    else{
        await next()
    }
}

const model_delete= async (ctx ,next)=>{

    let {username:id}=ctx.request.body

    let err=[]
    if (!(id)) {
        err.push("Provide required Information")
    }else{
        if (!uuid.validate(id)) {
            err.push("Wrong Username")
        }
    }
    if (err.length != 0) {
       response_send(ctx,403,{error:err}) 
       return
    }
    else{
        await next()
    }
}

const model_give_acsess = async (ctx,next)=>{
    let {username:email,permission}=ctx.request.body
    let owner_data=ctx.state.user_data

    let res=await find({_id:email})
    let role=res[0]?.role || []
    let [obj_role]=role.filter((el)=>{if(el.owner_id==owner_data.owner) return el})
    let err=[]
    if (!(email) && !(user_type)) {
        err.push("Provide required Information")
    }else{
        if (!uuid.validate(email)) {
            err.push("Wrong Username")
        }
        if (! type_validator(permission,"boolean")) {
            err.push("Wrong Permission")
        }
        if (!( obj_role?.type == 'cs')) {
            err.push("User Is not CS")
        }
    }
    if (err.length != 0) {
       response_send(ctx,403,{error:err}) 
    }
    else{
        await next()
    }
}


module.exports={model_invite,model_delete,model_give_acsess}