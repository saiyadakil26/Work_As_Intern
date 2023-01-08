// declarative functions

function add(num1=0,num2=0) {
    return num1+num2
}

//fatarrow function

const add1=(num1=0,num2=0)=>{
    return num1+num2
}

//exprational function

const add2=function(num1=0,num2=0) {
    return num1+num2
}

console.log(add(1,2));
console.log(add1(1,2));
console.log(add2(1,2));

//OUT: all three give same output 3