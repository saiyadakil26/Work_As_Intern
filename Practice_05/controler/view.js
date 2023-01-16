const fs=require('fs');
const valid=require('../validator/logout_validation')

const user_view=async(token)=>{
    let old_data = fs.readFileSync(__dirname+"\\db.json");
    let obj = JSON.parse(old_data);
    try {
        await valid(obj,token)
        let view_data=obj.filter((el)=>{
            if((el.token.includes(token))){
                return el
            }
        }) 
        return {code:200,msg:"User Delete Succsessfully",data:view_data} 
    } catch (e) {
        return {code:201,msg:"User Is not valid."}
    }
}
module.exports=user_view