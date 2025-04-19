import { inspect } from 'util';
export var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["ERROR"] = 0] = "ERROR";
    LogLevel[LogLevel["WARN"] = 1] = "WARN";
    LogLevel[LogLevel["INFO"] = 2] = "INFO";
    LogLevel[LogLevel["DEBUG"] = 3] = "DEBUG";
    LogLevel[LogLevel["TRACE"] = 4] = "TRACE";
})(LogLevel || (LogLevel = {}));
class Logger {
    static instance;
    config = {
        level: LogLevel.ERROR,
        showTimestamp: true,
        showLevel: true,
        debugCategories: []
    };
    constructor() { }
    static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }
    configure(config) {
        this.config = { ...this.config, ...config };
    }
    formatMessage(level, category, message) {
        const parts = [];
        if (this.config.showTimestamp) {
            parts.push(`[${new Date().toISOString()}]`);
        }
        if (this.config.showLevel) {
            parts.push(`[${LogLevel[level]}]`);
        }
        if (category) {
            parts.push(`[${category}]`);
        }
        if (typeof message === 'object') {
            parts.push(inspect(message, { depth: null, colors: true }));
        }
        else {
            parts.push(String(message));
        }
        return parts.join(' ');
    }
    shouldLog(level, category) {
        if (level > this.config.level)
            return false;
        if (category && this.config.debugCategories && this.config.debugCategories.length > 0) {
            return this.config.debugCategories.includes(category);
        }
        return true;
    }
    error(message, category = '') {
        if (this.shouldLog(LogLevel.ERROR, category)) {
            console.error(this.formatMessage(LogLevel.ERROR, category, message));
        }
    }
    warn(message, category = '') {
        if (this.shouldLog(LogLevel.WARN, category)) {
            console.warn(this.formatMessage(LogLevel.WARN, category, message));
        }
    }
    info(message, category = '') {
        if (this.shouldLog(LogLevel.INFO, category)) {
            console.info(this.formatMessage(LogLevel.INFO, category, message));
        }
    }
    debug(message, category = '') {
        if (this.shouldLog(LogLevel.DEBUG, category)) {
            console.debug(this.formatMessage(LogLevel.DEBUG, category, message));
        }
    }
    trace(message, category = '') {
        if (this.shouldLog(LogLevel.TRACE, category)) {
            console.trace(this.formatMessage(LogLevel.TRACE, category, message));
        }
    }
}
export const logger = Logger.getInstance();
//# sourceMappingURL=logger.js.map