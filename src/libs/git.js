const { execSync } = require('child_process')
const path = require('path')
const chalk = require('chalk');
const emoji = require('node-emoji')
const { getZeroTimestamp, getWeeklyZeroTimestamp, checkDirExist, pathResolve, getAbsolutePath } = require('../utils')
const { warn, log } = require('../utils/logger')
const { addGitPath, rmGitPath } = require('./options')

const GIT_CONFIG_COMMAND = 'git config --list'
const GIT_DIR = '.git'
const generateGitLogCommand = (since, author) => `git log --color --since=${since} --author=${author} --pretty=format:\'%s\'`

const timeRangeMap = {
  day: getZeroTimestamp() / 1000 >> 0,
  week: getWeeklyZeroTimestamp() / 1000 >> 0
}

const handleHasNotGitPath = paths => {
  warn(
    '以下目录不是Git项目目录\n' +
    paths
      .map(path => emoji.emojify(':file_folder:') + path)
      .join('\n')
  )
}

function addGitProject (paths, args) {
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

function rmGitProject (paths, args) {
  // 去重后的绝对路径
  const absolutePaths = getAbsolutePath(paths)
  // 持久化git目录地址
  rmGitPath(absolutePaths)
}

function getGitConfig (path) {
  const stdout = execSync(GIT_CONFIG_COMMAND, { cwd: path }).toString()

  const config = stdout
    .split('\n')
    .filter(str => !!str)
    .reduce((acc, curr) => {
      let [keyStr, value] = curr.split('=')
      let [key, okey] = keyStr.split('.')

      if (!acc[key]) {
        acc[key] = {}
      }

      acc[key][okey] = value

      return acc
    }, {})

  return config
}

function getGitCommitMessages (path, range = 'day') {
  const gitConfig = getGitConfig(path)
  const { user: { name: author } } = gitConfig

  const since = timeRangeMap[range]

  const gitLogCommand = generateGitLogCommand(since, author)
  const stdout = execSync(gitLogCommand, { cwd: path }).toString()

  const commitMessages = stdout
    .split('\n')
    .filter(str => !str.startsWith('Merge branch'))

  return commitMessages
}

module.exports = {
  addGitProject,
  rmGitProject,
  getGitCommitMessages
}