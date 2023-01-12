const crypto = require('crypto');  

// ! Hasing.

const password="akil"
const secret = '1234536478563940849304975937263s';  

// console.log(crypto.getHashes());
// console.log(crypto.getCiphers())

const hash = crypto.createHmac('sha256', secret).update(password).digest('hex');   
const hash1 = crypto.createHmac('md5', secret).update(password).digest('hex');  

console.log(hash);
console.log(hash1);
console.log(hash1==hash);  

// ! Encription - Decription.

let iv=crypto.randomBytes(16)
let key = crypto.scryptSync(password, 'salt', 32); //key dout.

let ciper=crypto.createCipheriv('aes-256-cbc',key,iv)
let encrpt=ciper.update(password,'utf-8','hex')
encrpt+=ciper.final('hex')

console.log(encrpt);

let dipciper=crypto.createDecipheriv('aes-256-cbc',key,iv)
let decript=dipciper.update(encrpt,'hex','utf-8')
decript+=dipciper.final('utf-8')

console.log(decript);