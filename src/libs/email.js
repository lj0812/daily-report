const nodemailer = require('nodemailer')
const { getEmailConfig } = require('./options')
const { aesDecrypt } = require('./crypto')
const emailTransportOpts = require('../constant/email-transport')

const cryptedEmail = getEmailConfig()
const email = Object.entries(cryptedEmail).reduce((acc, [key, value]) => {
  return Object.assign(acc, { [key]: aesDecrypt(value) })
}, {})

function parseEmailAddress (address) {
  const reg = /(?<=@)([0-9a-zA-Z]+)(?=\.)/
  const matched = reg.exec(address)
  if (matched.length === 0) {
    return false
  }

  return matched[0]
}

function getTransportConfig () {
  const emailDomainName = parseEmailAddress(email.address)
  const emailTransport = emailTransportOpts[`EMAIL_${emailDomainName.toUpperCase()}`]

  if (!emailTransport) {
    return false
  }

  return emailTransport
}

function createTransporter () {

}

function sendEmail (msg) {
  const transporter = createTransporter()

  transporter.sendMail({

  })
}

module.exports = {

}