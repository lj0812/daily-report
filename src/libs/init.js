const inquirer = require('inquirer')
const { saveOptions } = require('./options')
const { aesEncrypt } = require('./crypto')

const EMAIL_REG = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const emailNamePrompt = { type: 'input', name: 'email.name', message: '姓名' }
const emailAddressPrompt = {
  type: 'input',
  name: 'email.address',
  message: '邮件地址',
  validate (input) {
    return new Promise((resolve, reject) => {
      EMAIL_REG.test(input)
        ? resolve(true)
        : reject('你需要提供一个正确的邮箱地址')
    })
  }
}
const emailPasswordPrompt = { type: 'password', name: 'email.password', message: '邮箱密码' }

module.exports = function (cmd) {
  inquirer
    .prompt([
      emailNamePrompt,
      emailAddressPrompt,
      emailPasswordPrompt
    ])
    .then(answers => {
      const { email } = answers
      const cryptedEmail = Object.entries(email).reduce((acc, [key, value]) => {
        return Object.assign(acc, { [key]: aesEncrypt(value) })
      }, {})

      answers.email = cryptedEmail
      saveOptions(answers)
    })
}