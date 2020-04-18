const program = require('commander')
const { version } = require('./constant')

program
  .command('add <paths...>')
  .description('添加目录为工作目录，允许获取该目录下git commit')
  .action((paths, cmd) => {
    require('./libs/git').addGitProject(paths, cmd)
  })

program
  .command('rm <paths...>')
  .description('删除相关目录，不再获取该目录下git commit')
  .action((paths, cmd) => {
    require('./libs/git').rmGitProject(paths, cmd)
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
  .command('init')
  .description('配置')
  .action(cmd => {
    require('./libs/init')(cmd)
  })


program
  .version(version)
  .parse(process.argv)