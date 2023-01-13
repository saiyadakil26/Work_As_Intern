const fs=require('fs')
const crypto = require('crypto');
const valid=require('../validator/signup_validation') 

const signup =async(data)=>{

    let old_data = fs.readFileSync(__dirname+"\\db.json");
    let obj = JSON.parse(old_data);

    data=JSON.parse(data)

    const secret = '1234536478563940849304975937263s';  
    data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');

    try{
        let v= await valid(obj,data)

        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512',salt).update(data.password).digest("base64");
        let token = salt + "$" + hash;
        data["token"]=[token]

        obj.push(data)
        let new_data = JSON.stringify(obj);

        try{
            fs.writeFileSync(__dirname+"\\db.json", new_data, (err) => {
                if (err) throw new Error() 
            }); 
            return {code:200,msg:"signup Succsessfully",token:token}
        }
        catch(e){
            return {code:400,msg:"Sorry Something Went Wong"}
        }

    }
    catch(e){
        return {code:400,msg:e.toString()}
    }
}
module.exports=signup