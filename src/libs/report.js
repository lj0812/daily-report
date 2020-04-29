const { getGitPaths } = require('./options')
const { getGitCommitMessages } = require('./git')
const { sendEmail } = require('./email')

module.exports = function generateReport (range, cmd) {
  const gitPaths = getGitPaths()

  const dirAndMsg = gitPaths.map(path => ({ path, commits: getGitCommitMessages(path, range) }))

  console.log(dirAndMsg)

  sendEmail(dirAndMsg)
}