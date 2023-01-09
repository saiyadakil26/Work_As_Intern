// ! Class (Classes are a template for creating objects and then use same methods with differnt object)

class Student{ // here we create one class name student.
    constructor(name="",age=12,collage="AIT"){ // constroctar run when object is created
        this.name=name
        this.age=age
        this.collage=collage
    }
    intro(){ //method of student class
        console.log(`My name is ${this.name} I am ${this.age} year old. I am study in ${this.collage}`);
    }
}

const stud=new Student("Akil",19,"AIT") // make stud object of student class
stud.intro() //call class method using object.