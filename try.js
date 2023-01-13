const fs=require('fs')

const fun=()=>{
    let data;
fs.writeFileSync("ab.txt","hello",()=>{
    data= "Hello"
})   
return data
}

const cons=async()=>{
    console.log(fun());
}

cons()