const {MongoClient}=require('mongodb')
require('dotenv').config()

let conn= new MongoClient(process.env.connection_string);

const db_connect=async()=>{
    try {
        await conn.connect(); //connect to mongodb
        return true
    } catch (e) {
        console.log("Error : Database Connection Error.",e);
        return false
    }
}

module.exports={db_connect,conn}