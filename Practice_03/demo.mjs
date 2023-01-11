const timer=()=>{
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res("Hello") 
        },1000)
        console.log("From function");
    })
}

let name= await timer()
console.log(name);
console.log("Done");