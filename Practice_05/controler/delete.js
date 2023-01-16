const fs=require('fs');
const valid=require('../validator/logout_validation')

const user_delete=async(token)=>{
    let old_data = fs.readFileSync(__dirname+"\\db.json");
    let obj = JSON.parse(old_data);
    try {
        await valid(obj,token)
        let new_obj=obj.filter((el)=>{
            if(!(el.token.includes(token))){
                return el
            }
        })
        let new_data = JSON.stringify(new_obj);

        fs.writeFileSync(__dirname+"\\db.json", new_data, (err) => {
            if (err) throw err;
        }); 
        return {code:200,msg:"User Delete Succsessfully"} 
    } catch (e) {
        return {code:201,msg:"User Is not valid."}
    }
}
module.exports=user_delete