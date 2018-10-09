import program from 'commander'
import chalk from 'chalk'
import helpers from './helpers'
import { version } from '../package'

program
  .version(version, '-v, -version')
  .option('-s, --spec', 'Display PC Specification')
  .option('-c, --cpu', 'Display CPU Usage')
  .option('-m, --memory', 'Display Memory Usage')
  .option('-d, --disk', 'Display Disk Usage')
  .option('-b, --battery', 'Battery information')
  .parse(process.argv)

helpers.createMessage(program).then(msg => {
  console.log(msg)
}).catch(err => {
  console.log(chalk`{bold.red Something went wrong! :( \n ${err}}`)
  process.exit(1)
})

export default program
