// ! fat arrow function

const add=(num1=0,...b)=>{ //normal Fat arrow Function
    let sum=num1
    b.forEach((el)=>{ // Fat arrow function as a Call back function
        sum+=el
    })
    return sum
}

console.log(add(1,2,3,4)); //OUT : 10

let obj={
    name:"akil",
    age:19,
    intro_with_arrow_function:()=>{ //// we can not use this keyword to refer current scope in Fat arrow function
        console.log(`My name is ${this.name} And I am ${this.age} Year Old.`);
    },
    intro_with_function:function(){ // we can use this keyword to refer current scope in normal function
        console.log(`My name is ${this.name} And I am ${this.age} Year Old.`);
    }
}

obj.intro_with_arrow_function() // OUT: My name is undefined And I am undefined Year Old.
obj.intro_with_function() // OUT: My name is akil And I am 19 Year Old.