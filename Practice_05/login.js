const fs=require('fs')
const crypto = require('crypto'); 

const login =async(data,token)=>{

    const valid=(obj,data)=>{
        return new Promise((res,rej)=>{
            let {username,password} =data
            if (token != "") {
                let arr=obj.map((el)=>el.token).flat()
                if(arr.includes(token)){
                    res("Authenticated By token")
                }else{
                    res("Invalid Token")
                }
            }
            if (!(username &&  password)) {
                res("Please Provide Requred Information")
            }

            let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if ( ! username.match(paten)) {
                res("Please Provide valid Username")
            }

            let arr_detaill=obj.filter((el)=>el.email==username && el.password==password)
            if (arr_detaill.length != 1){
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

        fs.writeFileSync("db.json", new_data, (err) => {
            if (err) throw err;
        }); 
        return {code:200,msg:"login Succsessfully",token:token_new} 
    }else if (v=="Authenticated By token") {
        return {code:200,msg:"You are already login"} 
    }
    else{
        return {code:201,msg:v}
    }
}
module.exports=login