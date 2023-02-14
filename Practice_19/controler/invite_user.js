const { update_role_query, give_accsess_by_id,delete_role_by_id, delete_user_by_id } = require("../query/user")
const { generate_token } = require("../common_function/generate_token")
const send_mail = require("../common_function/send_mail")
const response_send = require("../config/response")
const { insert_one_invite ,count_invited_user} = require("../query/invited_user")
const { find, invited_user_db} = require("../query/user")

const invite_user=async(ctx,next)=>{
    let {user_data} = ctx.state
    let invited_data= ctx.request.body
    try {
        let is_exist=await find({email:invited_data.username})
        is_exist=is_exist[0]
          
        if(is_exist?.user_type === 'owner'){
            response_send(ctx,400,{error:"You can't Invite Our Owner"})
            return
        }
        else {
            let [is_invited,in_db]=await Promise.all([count_invited_user(invited_data.username,user_data._id),invited_user_db(invited_data.username,user_data._id)])

            // const is_invited= await count_invited_user(invited_data.username,user_data._id)
            // const in_db=await invited_user_db(invited_data.username,user_data._id)

            if(is_invited == 1 || in_db==1){
                response_send(ctx,400,{error:"You Are Already Invite This User",
                note:"If you want to Update role click here http://localhost:5000/updaterole"})
                return
            }

            else{
                let tokendata={...invited_data,owner:user_data._id}
                await insert_one_invite(tokendata)
                let token = await generate_token(ctx,tokendata)
                let subject=`You are Invited At SocialPilot By ${user_data._id}`
                let text= `http://localhost:5000/invite_signup?id=${token}`
                let succsess=await send_mail(subject,text,invited_data)
                if (succsess) {
                    response_send(ctx,200,{msg:"User Invited Succsessfully",invite_link:text})
                    return
                }else{
                    response_send(ctx,200,{error:"Error when sendng Mail"})
                    return
                }
            }

        }
        
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
        return
    }
    
}

const update_role=async(ctx,next)=>{

    let data= ctx.request.body
    let owner_data=ctx.state.user_data
    try{
        if (! data.permission) {
            let obj={"role.$.type":data.user_type}
            if (data.user_type=='cs') {
                 obj["role.$.is_permited"]=false
            }
            let res=await update_role_query(owner_data.owner,data.username,data.user_type)
            if (res.modifiedCount!=0) {
                response_send(ctx,200,{msg:"Role Updated Succsessfully"})
            }
            else{
                if (res.matchedCount) response_send(ctx,200,{error:`${data.username} Role Alredy as ${data.user_type}`})
                else response_send(ctx,200,{error:`${data.username} is Not in Team Yet`})
            }
        }else{
            await give_accsess_by_id({_id:data.username,"role.owner_id":owner_data.owner},data.permission)
            response_send(ctx,200,{msg:"Permission Allocated."})
        } 
    }catch(err){
        response_send(ctx,200,{error:err.toString()})
    }

}

// const give_acsess=async (ctx,next)=>{
//     let data= ctx.request.body
//     let owner_data=ctx.state.user_data
//     await give_accsess_by_id({_id:data.username,"role.owner_id":owner_data.owner},data.permission)
//     response_send(ctx,200,{msg:"Permission Allocated."})
// }

const delete_user=async (ctx,next)=>{
    let data= ctx.request.body
    let owner_data=ctx.state.user_data
    try {
        let [not,res]=await Promise.all([delete_role_by_id(data.username,owner_data.owner),await find({_id:data.username})])
        if(res[0].role.length==0){
            await delete_user_by_id({_id:data.username})
        }
        response_send(ctx,200,{msg:"User Deleted Succsessfully"})
    } catch (error) {
        response_send(ctx,200,{error:error.toString()})
    }

}

module.exports={invite_user,update_role,
    // give_acsess,
    delete_user}