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

const T = v => Object.prototype.toString.call(v).slice(8, -1).toLowerCase()

const formatValue = val => {
  return val < 10 ? `0${val}` : val
}

const formatWeek = (week, weekPrefix = '周') => {
  let weekMap = ['日', '一', '二', '三', '四', '五', '六']

  return `${weekPrefix}${weekMap[week]}`
}

const extractTime = time => {
  const date = T(time) === 'date'
    ? time
    : new Date(time)

  const year = date.getFullYear()
  const month = date.getMonth()
  const day = date.getDate()
  const week = date.getDay()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const cMonth = formatValue(month + 1)
  const cDay = formatValue(day)
  const cWeek = formatWeek(week)
  const cHour = formatValue(hour)
  const cMinute = formatValue(minute)
  const cSecond = formatValue(second)

  return { year, month, day, week, hour, minute, second, cMonth, cDay, cWeek, cHour, cMinute, cSecond }
}

const getZeroTimestamp = (date = new Date) => {
  const { year, month, day } = extractTime(date)

  return new Date(year, month, day, 0, 0, 0).getTime()
}

const getWeeklyZeroTimestamp = (date = new Date) => {
  const { year, month, day, week } = extractTime(date)

  const gap = (week - 1 + 7) % 7
  return new Date(year, month, day - gap, 0, 0, 0).getTime()
}

module.exports = {
  checkDirExist,
  pathResolve,
  getAbsolutePath,
  getZeroTimestamp,
  getWeeklyZeroTimestamp
}