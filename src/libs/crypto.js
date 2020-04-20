const crypto = require('crypto')

const KEY = 'HELLO WORLD, HERE IS ME'

function aesEncrypt (plainData, key = KEY) {
  const cipher = crypto.createCipher('aes192', key)
  let crypted = cipher.update(plainData, 'utf8', 'hex')
  crypted += cipher.final('hex')
  return crypted
}

function aesDecrypt (encryptedData, key = KEY) {
  const decipher = crypto.createDecipher('aes192', key)
  let decrypted = decipher.update(encryptedData, 'hex', 'utf8')
  decrypted += decipher.final('utf8')
  return decrypted
}

module.exports = {
  aesEncrypt,
  aesDecrypt
}