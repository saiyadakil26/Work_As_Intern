// ! for of loop (Used to loop over data structures that are iterable such as Arrays, Strings, Maps, NodeLists, and more.)

const cars = ["Akil", "Pratik", "Savan","Parth"];
let text = "Intern : ";

for (let x of cars) {
  text += x + ", ";
}

console.log(text); // OUT : Intern : Akil, Pratik, Savan, Parth, 