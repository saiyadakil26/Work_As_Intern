const read_data=(a)=>{
    let limit=Math.floor(Math.random()*100)
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            if (a=="pratik") {
                rej(a)
            } else {
                res(a)
            }
        },limit)
    })
}
let arr=["akil","pratik","savan"]
const fun=()=>{
    arr.forEach(async(el)=>{
        let data=await read_data(el)
        console.log(data);
    })
}

fun()