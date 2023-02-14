const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('comment') //establish connection

const insert_one = (data)=> db.insertOne({...data})

const find_comment = (data,proj,sort)=> db.find({...data}).project({...proj}).sort({...sort}).toArray()

const delete_comment_query= (data)=> db.deleteOne({...data})

const update_comment_query= (data,up_data)=>{
    delete(up_data.id)
    return db.updateOne({...data},{$set:{...up_data}})
}

module.exports={insert_one,find_comment,update_comment_query,delete_comment_query}