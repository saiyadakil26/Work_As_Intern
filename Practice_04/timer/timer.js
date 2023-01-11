let myInt = setInterval(function () {
    console.log("Hello");
}, 1000);

let timeout=setTimeout(()=>{
    clearInterval(myInt)
},5000)

// let timeout1=setTimeout(()=>{
//    clearTimeout(timeout)
// },3000)

// let immediate = setImmediate(() => {
//     console.log('immediately executing immediate');
// });

//clearImmediate(immediate)