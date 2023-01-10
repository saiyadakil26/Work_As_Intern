import Bluebird from "bluebird";

// Using Promise.map:

let fileNames=["akil","pratik","parth"]

Bluebird.map(fileNames, function(fileName) {
    // Promise.map awaits for returned promises as well.
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(fileName)
        },0)
    })
   
}).then(function(res) {
    console.log("done");
});

// Using Promise.map and async/await:

await Bluebird.map(fileNames, function(fileName) {
    // Promise.map awaits for returned promises as well.
    return new Promise((res,rej)=>{
        setTimeout(()=>{
            res(fileName)
        },0)
    })
});
console.log("done");
