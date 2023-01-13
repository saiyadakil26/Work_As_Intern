const fs=require('fs')
const crypto = require('crypto'); 
const valid=require('../validator/login_validation')

const login =async(data,token)=>{

    let old_data = fs.readFileSync(__dirname+"\\db.json");
    let obj = JSON.parse(old_data);
    data=JSON.parse(data)

    const secret = '1234536478563940849304975937263s';  
    data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
    try {
        let v= await valid(obj,data,token)
        if (v=="Authenticated") {
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512',salt).update(data.password).digest("base64");
            let token_new = salt + "$" + hash;

            let data_for_token=obj.filter((el)=>el.email==data.username)
            let rest_all=obj.filter((el)=>el.email!=data.username)
            data_for_token[0]["token"].push(token_new)
            obj=[...data_for_token,...rest_all]
            let new_data = JSON.stringify(obj);
            try {   
                fs.writeFileSync(__dirname+"\\db.json", new_data, (err) => {
                    if (err) throw err;
                }); 
                return {code:200,msg:"login Succsessfully",token:token_new}    
            } catch (e) {
                return {code:400,msg:"Something Went Wrong"}   
            }
        }else if (v=="Authenticated By token") {
            return {code:200,msg:"You are already login"} 
        }
    } catch (e) {
        return {code:201,msg:e.toString()}
    }
}
module.exports=login