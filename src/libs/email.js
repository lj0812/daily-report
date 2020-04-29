const nodemailer = require('nodemailer')
const { getEmailConfig } = require('./options')
const { aesDecrypt } = require('./crypto')
const emailTransportOpts = require('../constant/email-transport')
const { error } = require('../utils/logger')

const cryptedEmail = getEmailConfig()
const email = Object.entries(cryptedEmail).reduce((acc, [key, value]) => {
  return Object.assign(acc, { [key]: aesDecrypt(value) })
}, {})

function parseEmailAddress (address) {
  return new Promise((resolve, reject) => {
    const reg = /(?<=@)([0-9a-zA-Z]+)(?=\.)/
    const matched = reg.exec(address)
    if (matched.length === 0) {
      reject('未能正确解析邮件host')
    }

    resolve(matched[0])
  })
}

function getTransportConfig (emailDomainName) {
  return new Promise((resolve, reject) => {
    emailDomainName = emailDomainName.toUpperCase()
    const emailTransport = emailTransportOpts[`EMAIL_${emailDomainName}`]

    if (!emailTransport) {
      reject('未找到匹配的邮箱协议')
    }

    resolve({
      ...emailTransport,
      auth: {
        user: email.address,
        pass: email.password
      }
    })
  })
}

function createTransport (address) {
  // 解析域名
  return parseEmailAddress(address)
    .then(domainName => {
      // 解析transport
      return getTransportConfig(domainName)
    })
    .then(transport => {
      return nodemailer.createTransport(transport)
    })
    .catch(errMsg => {
      error(errMsg)
      return false
    })
}

async function sendEmail (emailData) {
  const transporter = await createTransport(email.address)
  if (!transporter) return false

  transporter.sendMail({
    from: email.address,

    ...emailData
  })
}

module.exports = {
  sendEmail
}