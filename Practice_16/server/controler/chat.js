const {conn}=require('../config/connection')
const response_send = require('../config/response')
const controler_chat=async(ctx,next)=>{
    try {
        let data=ctx.request.body
        let owner=data.owner
        let msg=data.data_msg
        let to=data.to
        let db =conn.db('chat_app').collection('chat') //establish connection
        let res=await db.find({owner}).toArray()
        let arr=res[0].chat.filter((el)=> {if( ! el[to]) return el})
        arr.push(msg)
        await db.updateOne({owner},{$set:{"chat":arr}})
        response_send(ctx,200,{msg:"Done"})
    } catch (error) {
        response_send(ctx,200,{err:error.toString()})
    }
   
}
const controler_get_chat=async(ctx,next)=>{
    try {
        let data=ctx.request.body
        let owner=data.owner
        let db =conn.db('chat_app').collection('chat') //establish connection
        let res=await db.find({owner}).toArray()
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

module.exports={controler_chat,controler_get_chat,controler_get_group}