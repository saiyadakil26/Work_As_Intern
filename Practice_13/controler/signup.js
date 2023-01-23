const {MongoClient}=require('mongodb')
const db_Connection=require('../db/connection')

const signup_user = async (val,DataBase="mytest",collection="user")=>{
    const conn= await db_Connection()
    let db = conn.db(DataBase).collection(collection)
    await db.insertOne(val)
    conn.close()
}

module.exports={signup_user}