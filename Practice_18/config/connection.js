const {MongoClient}= require('mongodb')
require('dotenv').config()

let conn=new MongoClient(process.env.connection_string)

const db_connect=async()=>{
    try {
       await conn.connect()
    } catch (error) {
        console.log('Error In DataBase Connection',error.toString())
    }
}

module.exports={conn,db_connect}