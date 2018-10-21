import si from 'systeminformation'
import chalk from 'chalk'
import ora from 'ora'

const loading = ora('Loading... Please wait it may take a minute')

export default {
  // Main function
  async createMessage (program) {
    let msg = chalk`{bold.cyan Here are the informations what you asked for:}\n`

    if (!program.os && !program.cpu && !program.gpu && !program.moba && !program.battery && !program.memory && !program.disk) {
      loading.start()
      msg += await this.osInfo()
      msg += await this.cpuInfo()
      msg += await this.gpuInfo()
      msg += await this.mobaInfo()
      msg += await this.batteryInfo()
      msg += await this.memoryInfo()
      msg += await this.diskInfo()
      loading.stop()

      return msg
    }
    loading.start()
    if (program.os) msg += await this.osInfo()
    if (program.cpu) msg += await this.cpuInfo()
    if (program.gpu) msg += await this.gpuInfo()
    if (program.moba) msg += await this.mobaInfo()
    if (program.battery) msg += await this.batteryInfo()
    if (program.memory) msg += await this.memoryInfo()
    if (program.disk) msg += await this.diskInfo()

    loading.stop()

    return msg
  },
  // Helpers
  async osInfo () {
    const os = await si.osInfo()

    const msg = chalk`{bold.green ---- OS ----}\n{bold.green OS:} ${os.distro}\n{bold.green Platform:} ${os.platform}\n{bold.green Arch:} ${os.arch}\n{bold.green Relase:} ${os.release}\n`

    return msg
  },
  async cpuInfo () {
    const cpu = await si.cpu()
    const speed = await si.cpuCurrentspeed()

    const msg = chalk`{bold.green ---- CPU ----}\n{bold.green CPU:} ${cpu.manufacturer} ${cpu.brand}\n{bold.green Family:} ${cpu.family}\n{bold.green Speed max/min} ${speed.max}/${speed.min}\n{bold.green Cores:} ${cpu.cores}\n{bold.green Current speed:} ${speed.avg}Ghz\n`

    return msg
  },
  async gpuInfo () {
    const gpu = await si.graphics()
    const msg = chalk`{bold.green ---- GRAPHICS ----}\n{bold.green GPU:} ${gpu.controllers[0].model}\n{bold.green VRAM:} ${gpu.controllers[0].vram}\n{bold.green Display:} ${gpu.displays[0].model}\n{bold.green Resolution:} ${gpu.displays[0].resolutionx}/${gpu.displays[0].resolutiony}px\n`

    return msg
  },
  async mobaInfo () {
    const moba = await si.baseboard()
    const bios = await si.bios()

    const msg = chalk`{bold.green ---- MOBA ----}\n{bold.green MOBA:} ${moba.manufacturer} ${moba.model}\n{bold.green VERSION:} ${moba.version}\n{bold.green BIOS VERSION:} ${bios.version}\n`

    return msg
  },
  async batteryInfo () {
    const battery = await si.battery()
    const msg = chalk`{bold.green ---- BATTERY ----}\n ${battery.hasbatter ? `${battery.manufacturer} ${battery.model} (${battery.percent} ${battery.ischarging ? chalk`{bold ⚡️}` : ''})` : chalk.bold.red('X')}\n`

    return msg
  },
  async memoryInfo () {
    const mem = await si.mem()
    const memL = await si.memLayout()

    const msg = chalk`{bold.green ---- MEMORY ----}\n{bold.green RAM SIZE:} ${this.bytesToGb(mem.total)}GB\n{bold.green RAM SPEED:} ${memL[0].clockSpeed}Hz\n{bold.green RAM TYPE:} ${memL[0].type}\n{bold.green RAM USAGE:} ${Math.round(this.bytesToGb(mem.used) / this.bytesToGb(mem.total) * 100)}%\n`

    return msg
  },
  async diskInfo () {
    const msg = chalk`{bold.green ---- DISKs ----}\nComing soon!\n`

    return msg
  },
  bytesToGb (bytes) {
    if (bytes === 0) return '0 Byte'
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
    return `${Math.round(bytes / Math.pow(1024, i), 2)}`
  }
}
