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
    // TODO
    return false
  }

  return matched[0]
}

function getTransportConfig (emailDomainName) {
  emailDomainName = emailDomainName.toUpperCase()
  const emailTransport = emailTransportOpts[`EMAIL_${emailDomainName}`]

  if (!emailTransport) {
    // TODO
    return false
  }

  return {
    ...emailTransport,
    auth: {
      user: email.address,
      pass: email.password
    }
  }
}

function createTransporter (address) {
  const domainName = parseEmailAddress(address)
  if (!domainName) {
    // TODO
    return false
  }

  const transport = getTransportConfig(domainName)

  return nodemailer.createTransporter(transport)
}

function sendEmail (emailData) {
  const transporter = createTransporter(email.address)

  transporter.sendMail({
    from: email.address,

    ...emailData
  })
}

module.exports = {
  sendEmail
}