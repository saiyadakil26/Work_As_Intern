const fs=require('fs')
const crypto = require('crypto'); 

const login =async(data)=>{

    const valid=(obj,data)=>{
        return new Promise((res,rej)=>{
            let {username,password} =data

            if (!(username &&  password)) {
                res("Please Provide Requred Information")
            }

            let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if ( ! username.match(paten)) {
                res("Please Provide valid Username")
            }

            let arr_email=obj.filter((el)=>el.email==username && el.password==password)
            if (arr_email.length != 1){
                res("Please Provide valid Credential")
            }
            res("Authenticated")

        })
    }
    

    let old_data = fs.readFileSync("db.json");
    let obj = JSON.parse(old_data);
    data=JSON.parse(data)
    const secret = '1234536478563940849304975937263s';  
    data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
    let v= await valid(obj,data)
    if (v=="Authenticated") {
        return {code:200,msg:"login Succsessfully"} 
    }
    else{
        return {code:201,msg:v}
    }
}
module.exports=login