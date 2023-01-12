const path=require('path')

console.log(path.basename(__dirname))
console.log(path.dirname(__dirname));
console.log(path.extname(__filename));
console.log(path.join(__dirname,"\\hello.js"));
let  obj = { dir: 'D:\\Pratice_\\Practice_04\\path', base: 'path.js' }
console.log(path.format(obj));
console.log(path.normalize(__dirname));