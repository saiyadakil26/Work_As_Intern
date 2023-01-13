const fs=require('fs')
const crypto = require('crypto'); 

const signup =async(data)=>{

    const valid=(obj,data)=>{
        return new Promise((res,rej)=>{
            let {email,name,addres,mobile_number,password} =data

            if (!(email&& mobile_number&& password)) {
                res("Please Provide Requred Information")
            }

            let paten= /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if ( ! (email.match(paten))) {
                res("Please Provide valid E-mail")
            }
            if (! (mobile_number.toString().length == 10)) { 
                res("Please Provide valid Mobile Number")
            }

            let arr_email=obj.map((el)=>el.email)
            let arr_mobile=obj.map((el)=>el.mobile_number)
            let arr_pass=obj.map((el)=>el.password)

            if (arr_email.includes(email)) {
                res("Please Provide Unique Email")
            }
            if (arr_mobile.includes(mobile_number)) {
                res("Please Provide Unique Mobile Number")
            }
            if (arr_pass.includes(password)) {
                res("Password is alraedy taken")
            }
            res("all validate")

        })
    }
    

    let old_data = fs.readFileSync("db.json");
    let obj = JSON.parse(old_data);
    data=JSON.parse(data)
    const secret = '1234536478563940849304975937263s';  
    data.password = crypto.createHmac('sha256', secret).update(data.password).digest('hex');
    let v= await valid(obj,data)
    if (v=="all validate") {
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512',salt).update(data.password).digest("base64");
        let token = salt + "$" + hash;
        data["token"]=[token]
        obj.push(data)
        let new_data = JSON.stringify(obj);
        fs.writeFileSync("db.json", new_data, (err) => {
            if (err) throw err;
        }); 
        return {code:200,msg:"signup Succsessfully",token:token} 
    }
    else{
        return {code:201,msg:v}
    }
}
module.exports=signup