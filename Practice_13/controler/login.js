const db_Connection=require('../db/connection')
const jwt = require('jsonwebtoken')

const login_user=async (val,DataBase="mytest",collection="user")=>{
    const conn= await db_Connection()
    let db = conn.db(DataBase).collection(collection)
    const db_data = await db.find({email:val.user_name,password:val.password}).toArray()
    if (db_data.length==1) {
        const token =  jwt.sign({email:val.email,user_type:db_data[0].user_type},val.user_name)
        return token
    }
    throw new Error('Autentication Fail')
}

module.exports={login_user}