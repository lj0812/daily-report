const fs = require('fs')
const path = require('path')

const checkDirExist = path => {
  try {
    return fs.statSync(path).isDirectory()
  } catch (e) {
    if (e.code === 'ENOENT') {
      return false
    }
  }
}

const pathResolve = function (...paths) {
  return path.resolve(...paths)
}

const getAbsolutePath = paths => {
  const cwd = process.cwd()
  return [...new Set(paths.map(path => pathResolve(cwd, path)))]
}

const getZeroTimestamp = (date = new Date) => {
  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()

  return new Date(year, month, day, 0, 0, 0).getTime()
}

module.exports = {
  checkDirExist,
  pathResolve,
  getAbsolutePath,
  getZeroTimestamp
}