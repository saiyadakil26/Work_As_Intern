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

// let has=crypto.createCipheriv('aes-128-ccm')

//! hkdf,pdkdf,encrypt,decrypt