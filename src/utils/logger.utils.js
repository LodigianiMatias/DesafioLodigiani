import winston from 'winston'

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      format: winston.format.colorize({ all: true })
    }),
    new winston.transports.File({
      filename: './errors.log',
      level: 'warn',
      format: winston.format.simple()
    })
  ]
})

export const addLogger = (req, res, next) => {
  req.logger = logger
  req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString}`)
  next()
}
