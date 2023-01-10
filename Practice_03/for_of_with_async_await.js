const read_data=(a)=>{
    let limit=Math.floor(Math.random()*100)
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            // if (a=="pratik") {
            //     rej(a)
            // } else {
            //     res(a)
            // }
            res(a)
        },limit)
    })
}
let arr=["akil","pratik","savan"]
const fun=async()=>{
    // for (const i of arr) {
    //     let data=await read_data(i)
    //     console.log(data);
    // }
    for (const i in arr) {
        let data=await read_data(arr[i])
        console.log(data);
    }
}
fun()