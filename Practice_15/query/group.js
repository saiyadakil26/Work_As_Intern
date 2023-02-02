const insert_one = async (db,data)=>{
    return await db.insertOne({...data})
}
const groups_by_owner = async (db,data)=>{
    return await db.find({owner_id:data}).project({_id:0,owner_id:0}).toArray()
}
const groups_by_member=async(db,data)=>{
    return await db.find({members:{$in:[data]}}).project({_id:0,owner_id:0}).toArray()
}
module.exports ={insert_one,groups_by_owner,groups_by_member}