const {MongoClient}=require('mongodb')
require('dotenv').config()

let mongodb_client

const db_Connection = async() => {
    if(!mongodb_client){
            try {
                let connection_string=process.env.connection_string
                mongodb_client = new MongoClient(connection_string);
                await mongodb_client.connect();
                return mongodb_client
            } catch (e) {
                console.log("Error : Database Connection Error.",e);
                mongodb_client.close()
                return false
            }
    }
    return mongodb_client
}

module.exports=db_Connection