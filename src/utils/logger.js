import chalk from 'chalk'

class logger {
  constructor() {}

  log(msg) {
    console.log('log>>>', chalk.blue(msg))
  }

  info(msg) {
    console.log('info>>>', chalk.blue(msg))
  }

  err(msg) {
    console.log('error>>>', chalk.red(msg))
  }
}

export default new logger()
