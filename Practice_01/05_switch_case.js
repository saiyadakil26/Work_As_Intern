// ! here i am developing a function calculator and pass sign in the switch case and based on that run cases

//we can use switch case when we want to render multiple code block based on one condition.

const calculator=(num1,num2,sign)=>{

    switch (sign) {
        case "1":
            console.log(num1+num2);
            break;
        case "2":
            console.log(num1-num2);
            break;
        case "3":
            console.log(num1*num2);
            break;
        case "4":
            console.log(num1/num2);
            break;
        default:
            console.log("Invalid Option");
            break;
    }

}

// Options:
//         1: for sum 
//         2: for substraction
//         3: for multipication
//         4: for division

calculator(5,10,1) // pass option in third argument. //OUT:15