const path = require('path')
const fs = require('fs')
const os = require('os')
const cloneDeep = require('lodash.cloneDeep')
const { exit } = require('../utils/exit')

const RC_FILE_NAME = '.dprc'
const rcFile = path.resolve(os.homedir(), RC_FILE_NAME)

let cachedOptions

const loadOptions = () => {
  if (fs.existsSync(rcFile)) {
    try {
      cachedOptions = JSON.parse(fs.readFileSync(rcFile, 'utf-8'))
    } catch (e) {
      console.error(
        `Error loading saved preferences: ` +
        `~/.dprc may be corrupted or have syntax errors. ` +
        `Please fix/delete it and re-run dp-cli in manual mode.\n` +
        `(${e.message})`
      )

      exit(1)
    }

    return cachedOptions
  }

  return {}
}

const saveOptions = toSave => {
  const options = Object.assign(cloneDeep(loadOptions()), toSave)

  cachedOptions = options

  try {
    fs.writeFileSync(rcFile, JSON.stringify(options, null, 2))
    return true
  } catch (e) {
    error(
      `Error saving preferences: ` +
      `make sure you have write access to ${rcFile}.\n` +
      `(${e.message})`
    )
  }
}

const getGitPaths = () => {
  return (cachedOptions && cachedOptions.gitPaths) ||
    loadOptions().gitPaths ||
    []
}
exports.getGitPaths = getGitPaths

// 向.dprc中添加git目录
exports.addGitPath = (paths = []) => {
  const cachedGitPath = getGitPaths()
  const gitPaths = [ ...new Set([...cachedGitPath, ...paths]) ]
  saveOptions({ gitPaths })
}

// 从.dprc中删除git目录
exports.rmGitPath = paths => {
  const cachedGitPath = getGitPaths()
  const gitPaths = cachedGitPath.filter(path => !paths.includes(path))

  saveOptions({ gitPaths })
}

