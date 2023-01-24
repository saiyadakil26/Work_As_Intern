const db_Connection = require('../db/connection')

const is_valid_member = async (members, owner, collection = 'user', DataBase = "mytest") => {
    try {
        const conn = await db_Connection()
        let db = conn.db(DataBase).collection(collection)
        let output = await db.aggregate([
        {$match: {owner_id: owner}},
        {$group: {_id: null, emailArray: {$push:  "$email"}}},
        {$project: {_id: 0}}
        ]).toArray()
        let list_of_user=output[0].emailArray;
        for (const elm of members) {
            if(!list_of_user.includes(elm)) return false
        }
        return true
    } catch (error) {
        return false
    }
}
module.exports = is_valid_member