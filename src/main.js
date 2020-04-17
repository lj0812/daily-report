const program = require('commander')
const { version } = require('./constant')

program
  .command('add <paths...>')
  .description('添加目录为工作目录，允许获取该目录下git commit')
  .action((paths, cmd) => {
    require('./libs/add-path')(paths, cmd)
  })

program
  .command('rm <paths...>')
  .description('删除相关目录，不再获取该目录下git commit')
  .action((paths, cmd) => {
    require('./libs/rm-path')(paths, cmd)
  })

program
  .command('today', { isDefault: true })
  .description('生成日报')
  .action(cmd => {
    require('./libs/report')('day', cmd)
  })

program
  .command('week')
  .description('生成周报')
  .action(cmd => {
    require('./libs/report')('week', cmd)
  })


program
  .version(version)
  .parse(process.argv)