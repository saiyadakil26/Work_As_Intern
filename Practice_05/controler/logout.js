const fs=require('fs')
const valid=require('../validator/logout_validation')

const logout=async(token)=>{
    let old_data = fs.readFileSync(__dirname+"\\db.json");
    let obj = JSON.parse(old_data);
    let v= await valid(obj,token)
    if (v=="Authenticated By token") {

        let new_obj=obj.map((el)=>{
            if(el.token.includes(token)){
                el.token.splice(el.token.indexOf(token),1)
                return el
            }else{
                return el
            }
        })
        let new_data = JSON.stringify(new_obj);

        fs.writeFileSync(__dirname+"\\db.json", new_data, (err) => {
            if (err) throw err;
        }); 
        return {code:200,msg:"logout Succsessfully"} 
    }
    else{
        return {code:201,msg:v}
    }
}

module.exports=logout