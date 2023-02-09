const send_mail = require("../common_function/send_mail")
const response_send = require("../config/response")
const { find, update_by_email, update_field, find_by_id_invite, update_role_query,delete_by_email, delete_user_by_email, give_accsess_by_id } = require("../query/user")
const { generate_token } = require("../validator/generate_token")

const invite_user=async(ctx,next)=>{

    let {user_data} = ctx.state
    let invited_data= ctx.request.body

    try {

        let is_exist=await find({email:invited_data.username})
        is_exist=is_exist[0]
          
        if(is_exist?.user_type === 'owner'){
            response_send(ctx,400,{error:"You can't Invite Our Owner"})
        }else {
            let is_invited=await find_by_id_invite(user_data.email,invited_data.username)
            if(is_invited.length == 1){
                response_send(ctx,400,{error:"You Are Already Invite This User",
                note:"If you want to Update role click here http://localhost:5000/updaterole"})
            }
            else{
                let tokendata={...invited_data,owner_email:user_data.email}
                let token = await generate_token(ctx,tokendata)
                let subject=`You are Invited At SocialPilot By ${user_data.email}`
                let text= `http://localhost:5000/signup?id=${token}`
                let succsess=await send_mail(subject,text,invited_data)
                if (succsess) {
                    await update_field(user_data.email,"invited_user",invited_data.username)
                    response_send(ctx,200,{msg:"User Invited Succsessfully",invite_link:text})
                }else{
                    response_send(ctx,200,{error:"Error when sendng Mail"})
                }
            }

        }
        
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }
    
}

const update_role = async (ctx,next)=>{
    let data= ctx.request.body
    let owner_data=ctx.state.user_data
    try{
        let obj={"role.$.type":data.user_type}
        if (data.user_type=='cs') {
             obj["role.$.is_permited"]=false
        }
        let res=await update_role_query(data.username,owner_data.email,obj)
        if (res.modifiedCount!=0) {
            response_send(ctx,200,{msg:"Role Updated Succsessfully"})
        }
        else{
            if (res.matchedCount) response_send(ctx,200,{error:`${data.username} Role Alredy as ${data.user_type}`})
            else response_send(ctx,200,{error:`${data.username} is Not in Team Yet`})
        }
        
        
    }catch(err){
        response_send(ctx,200,{error:err.toString()})
    }
}

const delete_user=async (ctx,next)=>{
    let data= ctx.request.body
    let owner_data=ctx.state.user_data
    try {
       await delete_by_email(data.username,owner_data.email)
        let res= await find({email:data.username})
        if(res[0].role.length==0){
            await delete_user_by_email({email:data.username})
        }
        response_send(ctx,200,{msg:"User Deleted Succsessfully"})
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }

}

const give_acsess=async (ctx,next)=>{
    let data= ctx.request.body
    let owner_data=ctx.state.user_data
    await give_accsess_by_id({email:data.username,"role.email":owner_data.email},data.permission)
    response_send(ctx,200,{msg:"Permission Allocated."})
}

module.exports={invite_user,update_role,delete_user,give_acsess}