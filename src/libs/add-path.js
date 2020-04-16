const path = require('path')
const chalk = require('chalk');
const emoji = require('node-emoji')
const { checkDirExist, getAbsolutePath } = require('../utils')
const { warn, log } = require('../utils/logger')
const { addGitPath } = require('./config')

const GIT_DIR = '.git'

const pathResolve = function (...paths) {
  return path.resolve(...paths)
}

const handleHasNotGitPath = paths => {
  warn('以下目录不是Git项目目录\n' + emoji.emojify(':star', chalk.red(paths.join('\n'))))
}

module.exports = function addPath (paths, args) {
  // 去重后的绝对路径
  const absolutePaths = getAbsolutePath(paths)

  // 有Git项目的目录
  const hasGitPath = absolutePaths.filter(path => checkDirExist(pathResolve(path, GIT_DIR)))
  // 持久化git目录地址
  addGitPath(hasGitPath)

  // 告知不是Git目录的路径
  const hasNotGitPath = absolutePaths.filter(path => !hasGitPath.includes(path))
  // 输出没有.git的目录给用户
  handleHasNotGitPath(hasNotGitPath)
}