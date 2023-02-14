console.log(process.env.PORT);

const fun= async ()=>{
    await other_fun()
    console.log("outside");
}

const other_fun=()=>
     new Promise((res,rej)=>{
        setTimeout(()=>{
            console.log("hello");
            res()
        },1000)
    }
    )


fun()
