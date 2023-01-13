const valid=(obj,token)=>{
    return new Promise((res,rej)=>{
        let arr=obj.map((el)=>el.token).flat()
        if(! arr.includes(token)){
            res("Please login First")
        }
        res("Authenticated By token") 
    })
}

module.exports=valid