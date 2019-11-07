const log4js = require('log4js');

log4js.configure({
    appenders: {
        out: {type: 'stdout'},
        app: {type: 'file', filename: 'application.log'
        }
    },
    categories: {
        default: {appenders: ['out', 'app'], level: 'debug'},
        // out: {appenders: ['out'], level: 'debug'}
    }
});


// const logger = log4js.getLogger("out");
const actualLogger = log4js.getLogger();

actualLogger.clearContext();
// logger.debug('I will be logged in all-the-logs.log');
//
// logger.debug("Some debug messages");
// logger.info("Hello how are you?")
// logger.error("error");


// const logMessage = ({level, message}) => {
//     actualLogger[level](message)
// }

// logger.info = message => {
//     logMessage({level: "info", message})
//     // actualLogger.info(`Logging request: ${message}`);
// }
let count = 1;
setInterval(() => {actualLogger.info("Hello"+ count); count = count + 1},1000);
// const orgConsole = console.log;
// console.log = ((message) => {
//     // console.log("Logging requested")
//     orgConsole(`Logging requested: ${message}`)
// })
//
// console.log("hello")
// console.log()