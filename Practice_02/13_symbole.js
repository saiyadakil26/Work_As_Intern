// ! Symbole (symbole is a primitive datatype of javascript its always be uniq)

let obj={ //testing object
    name:"akil",
    age:20
}

//create two symbole with same key but both are not same
let id1=Symbol("name") 
let id2=Symbol("name")

obj[id1]="Akil"
obj[id2]="Akil"

console.log(Symbol("name")==Symbol("name")); // OUT : false
console.log(obj); // OUT : {name: 'akil',age: 20,[Symbol(name)]: 'Akil',[Symbol(name)]: 'Akil'}