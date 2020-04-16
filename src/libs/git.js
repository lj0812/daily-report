const { execSync } = require('child_process')
const { getZeroTimestamp } = require('../utils')

const GIT_CONFIG_COMMAND = 'git config --list'
const generateGitLogCommand = (since, author) => `git log --color --since=${since} --author=${author} --pretty=format:\'%s\'`

const getGitConfig = path => {
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

const getGitCommitMessages = path => {
  const gitConfig = getGitConfig(path)
  const { user: { name: author } } = gitConfig

  const since = getZeroTimestamp() / 1000 >> 0

  const gitLogCommand = generateGitLogCommand(since, author)
  const stdout = execSync(gitLogCommand, { cwd: path }).toString()

  const commitMessages = stdout
    .split('\n')
    .filter(str => !str.startsWith('Merge branch'))

  return commitMessages
}

module.exports = {
  getGitCommitMessages
}