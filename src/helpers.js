import chalk from 'chalk'
// import os from 'os'

export default {
  // Main function
  async createMessage (program) {
    let msg = chalk`{bold.cyan Here are the informations what you asked for:}`

    if (program.spec) msg += await this.pcSpec()
    if (program.cpu) msg += await this.cpuUsage()
    if (program.memory) msg += await this.memoryUsage()
    if (program.disk) msg += await this.diskUsage()

    if (!program.spec && !program.cpu && !program.memory && !program.disk) {
      msg += await this.pcSpec()
      msg += await this.cpuUsage()
      msg += await this.memoryUsage()
      msg += await this.diskUsage()

      return msg
    }

    return msg
  },
  // Helpers
  async pcSpec () { },
  async cpuUsage () { },
  async memoryUsage () { },
  async diskUsage () { }
}
