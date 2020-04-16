const { getGitPaths } = require('./config')
const { getGitUserFromDir } = require('./git')

module.exports = function generateReport (cmd) {
  const gitPaths = getGitPaths()

  gitPaths.forEach(getGitUserFromDir)
}