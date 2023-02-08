const insert_one = async (db,data)=>{
    return await db.insertOne({...data})
}

const countDocument = async (db,data) =>{
   return await db.countDocuments({...data})
}
const find = async (db,data) =>{
    return await db.find({...data}).toArray()
}

const user_by_ownerid=async(db,data)=>{
   return await db.find({owner_id: data}).project({_id:0,email:1}).toArray()
}

module.exports={insert_one,countDocument,find,user_by_ownerid}