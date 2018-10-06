import program from 'commander'
import helpers from './helpers'
import { version } from '../package'

program
  .version(version, '-v, -version')
  .option('-s, -spec', 'Display PC Specification')
  .option('-c, -cpu', 'Display CPU Usage')
  .option('-m, -memory', 'Display Memory Usage')
  .option('-d, -disk', 'Display Disk Usage')
  .parse(process.argv)

helpers.createMessage(program).then(msg => {
  console.log(msg)
})

export default program
