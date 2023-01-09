// ! Destructuring ( Destructuring makes it possible to unpack values from arrays, or properties from objects)

let obj={
    name:"Akil",
    age:19,
    role:"NodeJs Intern"
}

const {name,age,role}=obj // Object destructuring
const [a,b]=[10,20] // array destructuring

console.log(name,age,role);  // OUT : Akil 19 NodeJs Intern
console.log(a,b); // OUT  : 10 20