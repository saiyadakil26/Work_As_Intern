const {MongoClient}=require('mongodb')
require('dotenv').config()

const mongodb_client = new MongoClient(process.env.connection_string); //mongo client global variable

const db_Connection = async() => { // call only one time to connect mongoDB
    try {
        await mongodb_client.connect(); //connect to mongodb
        return true
    } catch (e) {
        console.log("Error : Database Connection Error.",e);
        return false
    }
}

module.exports={db_Connection,mongodb_client} // export both function