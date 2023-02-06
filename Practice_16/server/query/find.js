const find_uniq_query =async(db,field,value)=>{
    return await db.countDocuments({[field]:value})
}


module.exports={find_uniq_query}