const { rmGitPath } = require('./config')
const { getAbsolutePath } = require('../utils')

module.exports = function rmPath (paths, args) {
  // 去重后的绝对路径
  const absolutePaths = getAbsolutePath(paths)
  // 持久化git目录地址
  rmGitPath(absolutePaths)
}