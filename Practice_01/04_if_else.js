// ! if else is used to check condition and based on condition render particular code.
 let username="Akil"
 let password="gtr56783&4TRH#B48DIO@90"

 if (username === "Akil" && password === "gtr56783&4TRH#B48DIO@90") {
    console.log("Authenticate Succsessfully");
 } else {
    console.log("Authenticate Fail due to wrong credential");
 }

 // ! we can also write nensted if condition like

//         if (condition) {
//             if (condition) {
//                  // code for condition true //
//              } else {
//                  // code for else //
//              } 
//          } else {
//              // code if first condition fail //
//          }

// ! we can make if else chain also like

//            if (condition) {
//                // code for condition true //
//            } else if(condition) {
//                // code if first condition fail and second setisfied //
//            }else{
//                // code if both condition fail //
//            }