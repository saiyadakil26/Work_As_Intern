const {conn}=require('../config/connection')
const response_send = require('../config/response')
const {BSON}=require('mongodb')
const controler_chat=async(ctx,next)=>{
    try {
        let data=ctx.request.body
        let to=data.to
        let msg=data.data_msg
        let from=data.from
        let db =conn.db('chat_app').collection('chat') //establish connection
        await db.updateOne({person:{$all:[from,to]}},{$set:{"chat":msg}})
        response_send(ctx,200,{msg:"Done"})
    } catch (error) {
        response_send(ctx,200,{err:error.toString()})
    }
   
}
const controler_get_chat=async(ctx,next)=>{
    try {
        let data=ctx.request.body
        let from=data.from
        let to=data.to
        let db =conn.db('chat_app').collection('chat') //establish connection
        let res=await db.find({person:{$all:[from,to]}}).toArray()
        response_send(ctx,200,{msg:res})
    }catch(error){
        response_send(ctx,200,{err:error.toString()})
    }
}

const controler_get_group= async (ctx,next)=>{
    try {
        let data=ctx.request.body
        let owner=data.owner
        let db =conn.db('chat_app').collection('group') //establish connection
        let res=await db.find({member:{$in:[owner]}}).toArray()
        response_send(ctx,200,{msg:res})
        
    } catch (error) {
        response_send(ctx,200,{err:error.toString()}) 
    }
}

const controler_add_group= async (ctx,next)=>{
    try {
        let data=ctx.request.body
        let db =conn.db('chat_app').collection('group') //establish connection
        let res=await db.insertOne(data)
        response_send(ctx,200,{msg:"Done"})    
    } catch (error) {
        response_send(ctx,200,{err:error.toString()}) 
    }
}

const controler_delete_group=async(ctx,next)=>{
    try {
        let data=ctx.request.body
        let db =conn.db('chat_app').collection('group') //establish connection
        let res=await db.deleteOne({_id:new BSON.ObjectId( data.id ) })
        response_send(ctx,200,{msg:"Done"})    
    } catch (error) {
        response_send(ctx,200,{err:error.toString()}) 
    }
}
const controler_group_chat=async(ctx,next)=>{
    let data=ctx.request.body
    let db =conn.db('chat_app').collection('group') //establish connection
    let res=await db.find({_id:new BSON.ObjectId(data.id ) }).toArray()
    response_send(ctx,200,{msg:res[0].chat})    
}

const controler_group_set_chat=async(ctx,next)=>{
    let data=ctx.request.body
    let db =conn.db('chat_app').collection('group') //establish connection
    let res=await db.updateOne({_id:new BSON.ObjectId(data.id ) },{$set:{chat:data.chat}})
    response_send(ctx,200,{msg:"Done"})
}
module.exports={controler_group_set_chat,controler_chat,controler_get_chat,controler_get_group,controler_add_group,controler_delete_group,controler_group_chat}