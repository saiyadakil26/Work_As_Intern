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

module.exports=valid