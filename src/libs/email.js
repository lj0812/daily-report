const nodemailer = require('nodemailer')
const { getEmailConfig } = require('./options')
const { aesDecrypt } = require('./crypto')

const cryptedEmail = getEmailConfig()
const email = Object.entries(cryptedEmail).reduce((acc, [key, value]) => {
  return Object.assign(acc, { [key]: aesDecrypt(value) })
}, {})

function parseEmailAddress (address) {
  const reg = /(?<=@)([0-9a-zA-Z]+)(?=\.)/
  const matched = reg.exec(address)
}

function getTransportConfig () {

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