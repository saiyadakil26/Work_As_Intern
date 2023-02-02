const {find_uniq_query} = require('../query/find')

const conn=require('../config/connect').mongodb_client


const find_uniq = async(field,value,collection='user',DataBase="mytest") => {
   try {
      let db = conn.db(DataBase).collection(collection)
      let output = await find_uniq_query(db,field,value)
      return output === 0 ? true : false
   } catch (error) {
      return false
   }
}
module.exports=find_uniq