const crypto = require('crypto')

// !----- Using Hmac

// const has=crypto.createHmac('sha256','0987654321').update("akil").digest('hex')

// const challenge=crypto.Certificate.exportChallenge("")
// console.log(challenge);

// console.log(has);

// !----- Using keys

// const {publicKey,privateKey}=crypto.generateKeyPairSync('ec',{namedCurve:"sect239k1"})

// const sign=crypto.createSign('SHA256')
// sign.write('mypassword')
// sign.end()
// const signature=sign.sign(privateKey,'hex')

// const verify=crypto.createVerify('SHA256')
// verify.write('mypassword')
// verify.end()

// console.log(verify.verify(publicKey,signature,'hex'));

// !----- cipher
// let key=crypto.randomBytes(32)
// let iv=crypto.randomBytes(16)
// const cipher=crypto.createCipheriv('aes-256-cbc',key,iv)
// let increapt=cipher.update('mypassword','utf-8','hex')
// increapt+=cipher.final('hex')
// console.log(increapt);

// const decipher=crypto.createDecipheriv('aes-256-cbc',key,iv)
// let decrypt=decipher.update(increapt,'hex','utf-8')
// decrypt+=decipher.final('utf-8')
// console.log(decrypt);


//! hkdf,pdkdf