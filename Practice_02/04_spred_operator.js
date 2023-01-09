// ! Spread Operator (...)

let arr1=[1,2,3,4]
let arr2=[5,6,7,8]

let arr=[...arr1,...arr2] // here we are using spread operator to concatinate two array

console.log(arr); // OUT: [1, 2, 3, 4, 5, 6, 7, 8 ]

let obj1={
    name:"akil",
    age:19
}
let obj2={
    role:"NodeJs Intern",
    company:"SocialPilot"
}

let obj={...obj1,...obj2} // here we are using spread operator to concatinate two object

console.log(obj); // OUT : { name: 'akil', age: 19, role: 'NodeJs Intern', company: 'SocialPilot' }