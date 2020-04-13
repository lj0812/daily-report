const fs = require('fs')

const checkDirExist = path => {
  try {
    return fs.statSync(path).isDirectory()
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false
    }
  }
}

module.exports = {
  checkDirExist
}