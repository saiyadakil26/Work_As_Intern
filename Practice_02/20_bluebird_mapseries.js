import Bluebird from "bluebird";
// The array to be mapped over can be a mix of values and promises.
var fileNames = ["1.txt","2.txt", "3.txt", "4.txt", "5.txt"];

Bluebird.mapSeries(fileNames, function(fileName, index, arrayLength) {
    // The iteration will be performed sequentially, awaiting for any
    // promises in the process.
    return new Promise((res,rej)=>{
        res(fileName)
    }).then(()=> {
        return fileName + "!";
    });
}).then(function(result) {
    // This will run after the last step is done
    console.log("Done!")
    console.log(result); // ["1.txt!", "2.txt!", "3.txt!", "4.txt!", "5.txt!"]
});