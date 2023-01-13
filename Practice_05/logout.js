const fs=require('fs')

const logout=async(token)=>{
    const valid=(obj,token)=>{
        return new Promise((res,rej)=>{
            let arr=obj.map((el)=>el.token).flat()
            if(! arr.includes(token)){
                res("Please login First")
            }
            res("Authenticated By token") 
        })
    }
    
    let old_data = fs.readFileSync("db.json");
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

        fs.writeFileSync("db.json", new_data, (err) => {
            if (err) throw err;
        }); 
        return {code:200,msg:"logout Succsessfully"} 
    }
    else{
        return {code:201,msg:v}
    }
}

module.exports=logout