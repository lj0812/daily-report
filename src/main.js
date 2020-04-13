const program = require('commander')
const { version } = require('./constant')

program
  .command('add <paths...>')
  .description('添加目录为工作目录，允许获取该目录下git commit')
  .action((paths, cmd) => {
    require('./libs/addDir')(paths, cmd)
  })

program
  .command('rm <paths...>')
  .description('删除相关目录，不再获取该目录下git commit')
  .action((paths, cmd) => {
    require('./libs/rmDir')(paths, cmd)
  })

program
  .version(version)
  .parse(process.argv)