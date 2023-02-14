const {conn} = require('../config/connection')
let db =conn.db('blog_app').collection('blog') //establish connection


const insert_one = (data)=>db.insertOne({...data})

const find= (data,proj,sort)=>db.find({...data}).project({...proj}).sort({...sort}).toArray()

const delete_blog_query= (data)=> db.deleteOne({...data})

const update_blog_query= (data,up_data)=>{
    delete(up_data.id)
 return db.updateOne({...data},{$set:{...up_data}})
}

module.exports={insert_one,find,update_blog_query,delete_blog_query}