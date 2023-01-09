// ! Here are some Mathods of Maths class which are introduce in ES6

let random=Math.random() //it will return always random number between 0 to 1
console.log(random); // OUT : 0.610819146348603

const math_trunc=(num)=>{ //truncate the number
    console.log(Math.trunc(num));
}

const math_sign=(num)=>{ // return sign of the number
    console.log(Math.sign(num)); 
}

const math_cuberoot=(num)=>{ //return cube root of the number
    console.log(Math.cbrt(num));
}

const math_log2=(num)=>{ // return log based on 2
    console.log(Math.log2(num));
}

const math_log10=(num)=>{ // return log based on 10
    console.log(Math.log10(num));
}

const math_ceil=(num)=>{ // always return lower value like for 4.9 return 4
    console.log(Math.ceil(num));
}

const math_floor=(num)=>{ // always return higher value like for 4.9 return 5
    console.log(Math.floor(num));
}

const math_round=(num)=>{ //return round figure value if decimal point is upto 0.5 then lower value else higher
    console.log(Math.round(num));
}

math_trunc(3.9) // OUT : 3
math_sign(-4) // OUT : -1
math_cuberoot(8) // OUT : 2
math_log2(2) // OUT : 1
math_log10(10) // OUT : 1
math_ceil(10.1) // OUT : 11
math_floor(10.9) // OUT : 10
math_round(10.2) // OUT : 10