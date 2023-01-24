const {MongoClient}=require('mongodb')

let mongodb_client

const db_Connection = async() => {
    if(!mongodb_client){
            try {
                mongodb_client = new MongoClient('mongodb://127.0.0.1:27017');
                await mongodb_client.connect();
                mongodb_client.db('mytest')
            //    console.log("DataBase connected Succsessfuly");
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