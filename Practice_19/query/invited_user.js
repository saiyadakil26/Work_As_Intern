const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('invited_user') //establish connection

const insert_one_invite = async (data)=>{
    return await db.insertOne({...data})
}

const count_invited_user=async(invite,owner)=>{
    return await db.countDocuments({$and:[{username:invite},{owner:owner}]})
}
const find_invited = async (data,proj,sort)=>{
    return await db.find({...data}).project({...proj}).sort({...sort}).toArray()
}

const delete_invited = async (data)=>{
    return await db.deleteOne({...data})
}

module.exports={find_invited,insert_one_invite,delete_invited
,count_invited_user}