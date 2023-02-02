const {MongoClient}=require('mongodb')
const db_Connection=require('../db/connection')

const find_uniq = async(field,value,collection='user',DataBase="mytest") => {
   try {
      const conn= await db_Connection()
      let db = conn.db(DataBase).collection(collection)
      let output = await db.find({[field]:value}).toArray().length
      console.log(output);
      return output === 0 ? true : false
   } catch (error) {
      console.log(error.toString());
      return false
   }
}
module.exports=find_uniq