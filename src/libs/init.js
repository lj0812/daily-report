const inquirer = require('inquirer')
const { saveOptions } = require('./options')

const EMAIL_REG = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

const emailNamePrompt = { type: 'input', name: 'emailName', message: '姓名' }
const emailAddressPrompt = {
  type: 'input',
  name: 'emailAddress',
  message: '邮件地址',
  validate (input) {
    return new Promise((resolve, reject) => {
      EMAIL_REG.test(input)
        ? resolve(true)
        : reject('你需要提供一个正确的邮箱地址')
    })
  }
}
const emailPasswordPrompt = { type: 'password', name: 'emailPassword', message: '邮箱密码' }

module.exports = function (cmd) {
  inquirer
    .prompt([
      emailNamePrompt,
      emailAddressPrompt,
      emailPasswordPrompt
    ])
    .then(answers => {
      console.log(answers)
      saveOptions(answers)
    })
}