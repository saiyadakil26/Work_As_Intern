const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('invited_user') //establish connection

const insert_one_invite =  (data)=>db.insertOne({...data})

const count_invited_user=(invite,owner)=>db.countDocuments({$and:[{username:invite},{owner:owner}]})

const find_invited =  (data,proj,sort)=> db.find({...data}).project({...proj}).sort({...sort}).toArray()

const delete_invited =  (data)=>db.deleteOne({...data})

module.exports={find_invited,insert_one_invite,delete_invited,count_invited_user}