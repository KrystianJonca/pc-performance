import program from 'commander'
import chalk from 'chalk'
import helpers from './helpers'
import { version } from '../package'

program
  .version(version, '-v, --version')
  .option('-o, --os', 'Display OS information')
  .option('-c, --cpu', 'Display CPU information')
  .option('-g, --gpu', 'Display GPU information')
  .option('-m, --moba', 'Display MOBA information')
  .option('-b, --battery', 'Display Battery information')
  .option('-me, --memory', 'Display Memory information')
  .option('-d, --disk', 'Display Disk information')
  .option('-n, --net', 'Display Internet speed information')
  .parse(process.argv)

helpers.createMessage(program).then(msg => {
  console.log(msg)
}).catch(err => {
  console.log(chalk`{bold.red Something went wrong! :( \n ${err}}`)
  process.exit(1)
})

export default program
