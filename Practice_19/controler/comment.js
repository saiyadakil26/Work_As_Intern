const { ObjectId } = require("mongodb");
const response_send = require("../config/response");
const { insert_one, update_comment_query, delete_comment_query } = require("../query/comment");

const post_comment=async(ctx,next)=>{
    let data=ctx.request.body
    delete(data.blog)
    await insert_one(data)
    response_send(ctx,200,{msg:"comment Succsessfully."})
    return
}

const update_comment=async(ctx,next)=>{
    let data=ctx.request.body
    let obj={_id:ctx.request.query.id}
    await update_comment_query(obj,data)
    response_send(ctx,200,{msg:"comment Updated Succsessfully."})
    return
}

const delete_comment=async(ctx,next)=>{
    let obj={_id:ctx.request.query.id}
    await delete_comment_query(obj)
    response_send(ctx,200,{msg:"comment Delete Succsessfully."})
    return
}

module.exports={post_comment,
    update_comment,
    delete_comment
}