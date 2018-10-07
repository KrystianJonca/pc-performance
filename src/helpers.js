import si from 'systeminformation'
import chalk from 'chalk'
// import os from 'os'

export default {
  // Main function
  async createMessage (program) {
    let msg = chalk`{bold.cyan Here are the informations what you asked for:}\n`

    if (program.spec) msg += await this.pcSpec()
    if (program.cpu) msg += await this.cpuUsage()
    if (program.cemory) msg += await this.memoryUsage()
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
  async pcSpec () {
    const os = await si.osInfo()
    const cpu = await si.cpu()
    const moba = await si.baseboard()
    const gpu = await si.graphics()

    const msg = chalk`{bold.green OS:} ${os.distro} ${os.arch}\n{bold.green CPU:} ${cpu.manufacturer} ${cpu.brand} (${cpu.speed}Ghz ${cpu.cores} Cores)\n{bold.green GPU:} ${gpu.controllers[0].model}(${gpu.controllers[0].vram} VRAM)\n{bold.green MOBA:} ${moba.manufacturer} ${moba.model}`

    return msg
  },
  async cpuUsage () {
    return 'Coming soon!'
  },
  async memoryUsage () {
    return 'Coming soon!'
  },
  async diskUsage () {
    return 'Coming soon!'
  }
}
