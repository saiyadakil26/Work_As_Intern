// ! set (set is a special type of object in JavaScript which alow us to store uniq value of any type)

let arr1=[1,2,3,4,5,6]
let arr2=[5,6,7,8,9,10]

let arr=new Set([...arr1,...arr2]) //concatinate both array and return new array with non repeating charecter.

console.log(arr); // OUT: Set(10) { 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 }

let n_set=new Set()
n_set.add(5)
n_set.add("Hello") // add is method of set to set any element
n_set.add({name:"Akil",lname:"saiyad"})
console.log(n_set.has(5)) // OUT : true // has is method of set to check any element
n_set.delete(5) // delete is method of set to remove any element
console.log(n_set.size); //OUT : 2 // size is method of set to get size of set
console.log(n_set); //OUT: Set(2) { 'Hello', { name: 'Akil', lname: 'saiyad' } }