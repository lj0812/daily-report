const path = require('path')
const chalk = require('chalk');
const emoji = require('node-emoji')
const { checkDirExist } = require('../utils')

const GIT_DIR = '.git'
const log = console.log

const pathResolve = function (...paths) {
  return path.resolve(...paths)
}

module.exports = function addDir (paths, args) {
  console.log('paths', paths)
  const cwd = process.cwd()
  console.log('cwd', cwd)

  const absolutePaths = [...new Set(paths.map(path => pathResolve(cwd, path)))]
  console.log('absolutePaths', absolutePaths)

  const hasGitDir = absolutePaths.filter(path => checkDirExist(pathResolve(path, GIT_DIR)))
  const hasNotGitDir = absolutePaths.filter(path => !hasGitDir.includes(path))

  // 输出没有.git的目录给用户
  log('\n' + chalk.red('以下目录不是Git项目目录'))
  log(chalk.red(hasNotGitDir.join('\n')))
}