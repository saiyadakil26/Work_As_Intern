const { ObjectId } = require("mongodb");
const response_send = require("../config/response");
const { insert_one, find, update_blog_query, delete_blog_query } = require("../query/blog");

const controler_blog=async(ctx,next)=>{
    let data=ctx.request.body
    delete(data.account);
    await insert_one(data)
    response_send(ctx,200,{msg:"Blog Uploaded Succsessfully."})
    return
}

const get_all_blog=async(ctx,next)=>{
    let obj={}
    if (ctx.request.query.id) obj["_id"]=new ObjectId(ctx.request.query.id)
    let res=await find(obj,{_id:0,title:1,desc:1,likes:{$size:"$like_by"}},{create_at:1})
    response_send(ctx,200,{msg:res})
}

const update_blog=async(ctx,next)=>{
    let data=ctx.request.body
    let obj={_id:new ObjectId(ctx.request.body.id)}
    let res=await update_blog_query(obj,data)
    response_send(ctx,200,{msg:"Blog Update Succsessfully"})
}
const delete_blog=async(ctx,next)=>{
    let obj={_id:new ObjectId(ctx.request.query.id)}
    let res=await delete_blog_query(obj)
    response_send(ctx,200,{msg:"Blog Deleted Succsessfully"})
    return
}

const like_dislike=async(ctx,next)=>{
    let obj={}
    const creater_data=ctx.state.user_data
    if (ctx.request.query.id) obj["_id"]=new ObjectId(ctx.request.query.id)
    let res=await find(obj,{_id:0,title:1,desc:1,likes:{$size:"$like_by"},like_by:1},{create_at:1})
    if (res.length==1) {
        let likes=res[0].like_by
        if (likes.includes(creater_data.email)) {
            likes.splice(likes.indexOf(creater_data.email),1)
            res[0].likes--
        }else{
            likes.push(creater_data.email)
            res[0].likes++
        }
        await update_blog_query(obj,{like_by:likes})
        res[0].like_by=undefined
        response_send(ctx,200,{msg:res})
    }
}

module.exports={controler_blog,get_all_blog,update_blog,delete_blog,like_dislike}