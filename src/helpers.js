import si from 'systeminformation'
import chalk from 'chalk'

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
    const battery = await si.battery()
    const cpu = await si.cpu()
    const moba = await si.baseboard()
    const gpu = await si.graphics()
    const ram = await si.mem()

    const msg = chalk`{bold.green ---- PC SPEC ----}\n{bold.green OS:} ${os.distro} ${os.arch}\n{bold.green CPU:} ${cpu.manufacturer} ${cpu.brand} (${cpu.speed}Ghz ${cpu.cores} Cores)\n{bold.green GPU:} ${gpu.controllers[0].model}(${gpu.controllers[0].vram} VRAM)\n{bold.green MOBA:} ${moba.manufacturer} ${moba.model}\n{bold.green RAM:} ${this.bytesToGb(ram.total)}\n{bold.green BATTERY:} ${battery.hasbatter ? `${battery.manufacturer} ${battery.model} (${battery.percent} ${battery.ischarging ? chalk`{bold ⚡️}` : ''})` : chalk.bold.red('X')}\n`

    return msg
  },
  async cpuUsage () {
    const msg = chalk`{bold.green ---- CPU USAGE ----}\n Coming soon! \n`

    return msg
  },
  async memoryUsage () {
    const msg = chalk`{bold.green ---- MEMORY USAGE ----}\n Coming soon! \n`

    return msg
  },
  async diskUsage () {
    const msg = chalk`{bold.green ---- DISK USAGE ----}\n Coming soon! \n`

    return msg
  },
  bytesToGb (bytes) {
    if (bytes === 0) return '0 Byte'
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return `${Math.round(bytes / Math.pow(1024, i), 2)} GB`
  }
}
