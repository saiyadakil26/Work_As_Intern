const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('comment') //establish connection

const insert_one = async (data)=>{
    return await db.insertOne({...data})
}

const find_comment = async (data,proj,sort)=>{
    return await db.find({...data}).project({...proj}).sort({...sort}).toArray()
}

const update_comment_query= async (data,up_data)=>{
    delete(up_data.id)
    return await db.updateOne({...data},{$set:{...up_data}})
}

const delete_comment_query= async (data)=>{
    return await db.deleteOne({...data})
}

module.exports={insert_one,find_comment,update_comment_query,delete_comment_query}