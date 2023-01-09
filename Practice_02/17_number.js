// Number Property

let x=Number.EPSILON
console.log(x); // OUT:2.220446049250313e-16

x = Number.MIN_SAFE_INTEGER; //safe integer : (2^53-1)
console.log(x); // OUT:-9007199254740991

x=Number.MAX_SAFE_INTEGER;
console.log(x); // OUT:9007199254740991 

// ! Number methods
const num_isinteger=(num)=>{
    let result=Number.isInteger(num)
    console.log(result);
}

const num_isSafeInteger=(num)=>{
    let result=Number.isSafeInteger(num)
    console.log(result);
}   

num_isinteger(10) // OUT : true
num_isinteger(10.1) // OUT : false
num_isSafeInteger(10) // OUT : true
num_isSafeInteger(1737388388377474747646) // OUT : false