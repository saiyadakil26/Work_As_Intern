//1. Arithmatic Operator (Do the Mathematical Operation)
let x=10
console.log("+ for the sum of two number",10+5); // OUT:15
console.log("- for the substraction of two number",10-5); // OUT:5
console.log("* for the multipication of two number",10*5); // OUT:50
console.log("/ for the division of two number",10/5); // OUT:2
console.log("** for the power of given number",10**2); // OUT:100
console.log("% for the modules of two number",10%5); // OUT:0
console.log("++ for the increament number by 1",++x); // OUT:11
console.log("-- for the decreament number by 1",--x); // OUT:10

//2. Comperision Operator (Do the comperation beetween two variable return boolean value)
console.log("== weak equal to comparition operator",10==5); // OUT:false
console.log("=== Strong equal to comparition operator",10===5); // ! compare datatype also // OUT:false
console.log("!= weak not equal to comparition operator",10!=5); // OUT:true
console.log("!== Strong not equal to comparition operator",10===5); // ! compare datatype also // OUT:true

//3. Relational Operator
console.log("< for the sum of two number",10<5); // OUT:false
console.log("> for the substraction of two number",10>5); // OUT:true
console.log("<= for the multipication of two number",10<=5); // OUT:false
console.log(">= for the division of two number",10>=5); // OUT:true

//4. Logical Operator
console.log("&& return true if both are tue",true&&true); // OUT:true
console.log("|| return true if one of them is true",true||false); // OUT:true
console.log("! reverce the condition",!true); // OUT:false

//5. Assignment Operator
let a=10
let b=20
console.log("+= for sum of two variable store in first variable",a+=b); // OUT: a=30
console.log("-= for substraction of two variable store in first variable",a-=b); // OUT: a=-10
console.log("*= for the multipication of two number store in first variable",a*=b); // OUT: a=200
console.log("/= for the division of two number store in first variable",a/=b); // OUT: a=0.5
console.log("**= for the power of given number store in first variable",a**=b); // OUT: a=100000000000000000000
console.log("%= for the modules of two number store in first variable",a%=b); // OUT: a=10

//6. Ternary Operator (?:)
let c=undefined
c?console.log("Hello"):console.log("Akil");  //it work just like if else. (if c return true then print 'Hello' else 'akil')