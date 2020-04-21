const { getEmailConfig } = require('./options')
const { aesDecrypt } = require('./crypto')

const cryptedEmail = getEmailConfig()
const email = Object.entries(cryptedEmail).reduce((acc, [key, value]) => {
  return Object.assign(acc, { [key]: aesDecrypt(value) })
}, {})

module.exports = {

}