// ! Promises (when our code is take time to execute an generate result in that case we return a promise 
//                    if our condition setisfied then prommise resolve otherwise reject)

const age_check=(age)=>{ //here age_check function is return promise
  return new Promise((res,rej)=>{
    if (age>18) {
        res("User is valid") // if age is greater then 18 then promise resolve
    } else {
        rej("User Age is Restricted") // otherwise promise rejected
    }
  })
}

age_check(20).then((res)=>{
    console.log(res); // code is executed if promise is resolved
}).catch((err)=>{
    console.log(err); // code is executed if promise is rejected
})