// ! here two methods are given which are introduce in ES6

const global_isfinite=(num)=>{ //return false if given value is NaN or Infinite
    let result=isFinite(num)
    console.log(result);
}

const global_isNaN=(num)=>{ // return true if given value is NaN (Note a Number)
    let result=isNaN(num)
    console.log(result);
}

global_isfinite(1) // OUT : true
global_isfinite(NaN) // OUT : false
global_isNaN("Hello") // OUT : true
global_isNaN(1) // OUT : false