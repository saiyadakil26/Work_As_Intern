const db_Connection=require('../db/connection')
const jwt=require('jsonwebtoken')

const add_group = async (val,collection="group",DataBase="mytest")=>{
    const conn= await db_Connection()
    let db = conn.db(DataBase).collection(collection)
    await db.insertOne(val)
}

const get_group =  (token,collection="group",DataBase="mytest")=>{
   return new Promise(async (res,rej)=>{
        try {
            if (!token)  rej("Please Login first")
            let token_data=jwt.decode(token)
            const conn= await db_Connection()
            let db = conn.db(DataBase).collection(collection)
            let output=""
            if(token_data.user_type === 'owner') output = await db.find({owner_id:token_data.email}).project({_id:0,owner_id:0}).toArray()
            else output = await db.find({members:{$in:[token_data.email]}}).project({_id:0,owner_id:0}).toArray()
            res(output) 
        } catch (error) {
            rej("Sorry Something went wrong try again")
        }
    })
}

module.exports={add_group,get_group}