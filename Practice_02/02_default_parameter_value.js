// ! Default parameter

const without_default_parameter = (num1,num2) =>{ // we are define this function parameter without any default value 
    return num1+num2                              // so it wil take undefine if its not passed at the time of function call 
}

const with_default_parameter =(num1=0,num2=0)=>{ // we are define here default parameter as 0 so if we are not pass any argument
    return num1+num2                             // It will take it as 0
}

console.log(without_default_parameter(5,5)); // OUT : 10 
console.log(without_default_parameter()); // OUT : NAN
console.log(with_default_parameter(5,5)); // OUT : 10 
console.log(with_default_parameter()); // OUT : 0