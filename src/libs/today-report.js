const { getGitPaths } = require('./config')
const { getGitCommitMessages } = require('./git')

module.exports = function generateReport (cmd) {
  const gitPaths = getGitPaths()

  const dirAndMsg = gitPaths.map(path => ({ path, commits: getGitCommitMessages(path) }))

  console.log(dirAndMsg)
}