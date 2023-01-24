const {MongoClient}=require('mongodb')
const db_Connection=require('../db/connection')

const find_uniq = async(field,value,collection='user',DataBase="mytest") => {
   const conn= await db_Connection()
   let db = conn.db(DataBase).collection(collection)
   let output = await(await db.find({[field]:value}).toArray()).length
   return output === 0 ? true : false
}
module.exports=find_uniq