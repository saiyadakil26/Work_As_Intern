// ! Async Await (it is used when we want to wait for completing any one task and then we want to done rest of work)

const read_data=()=>{ //we are create function read data which wait for 1 s then resolve promise
    return new Promise((res,rej)=>{
   setTimeout(()=>{
            res("Akil")
        },1000) 
    })
}

const log_name=async()=>{ // async function log_name
    let name=await read_data() //await (wait for read_data)
    console.log(name); // log after promise resolve
}
log_name()
console.log("Finish"); // rest of code continues executing.