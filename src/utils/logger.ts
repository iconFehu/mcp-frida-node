import { inspect } from 'util';

export enum LogLevel {
    ERROR = 0,
    WARN = 1,
    INFO = 2,
    DEBUG = 3,
    TRACE = 4
}

export interface LoggerConfig {
    level: LogLevel;
    showTimestamp?: boolean;
    showLevel?: boolean;
    debugCategories?: string[];
}

class Logger {
    private static instance: Logger;
    private config: LoggerConfig = {
        level: LogLevel.ERROR,
        showTimestamp: true,
        showLevel: true,
        debugCategories: []
    };

    private constructor() {}

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    configure(config: Partial<LoggerConfig>) {
        this.config = { ...this.config, ...config };
    }

    private formatMessage(level: LogLevel, category: string, message: any): string {
        const parts: string[] = [];
        
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
        } else {
            parts.push(String(message));
        }
        
        return parts.join(' ');
    }

    private shouldLog(level: LogLevel, category?: string): boolean {
        if (level > this.config.level) return false;
        
        if (category && this.config.debugCategories && this.config.debugCategories.length > 0) {
            return this.config.debugCategories.includes(category);
        }
        
        return true;
    }

    error(message: any, category: string = '') {
        if (this.shouldLog(LogLevel.ERROR, category)) {
            console.error(this.formatMessage(LogLevel.ERROR, category, message));
        }
    }

    warn(message: any, category: string = '') {
        if (this.shouldLog(LogLevel.WARN, category)) {
            console.warn(this.formatMessage(LogLevel.WARN, category, message));
        }
    }

    info(message: any, category: string = '') {
        if (this.shouldLog(LogLevel.INFO, category)) {
            console.info(this.formatMessage(LogLevel.INFO, category, message));
        }
    }

    debug(message: any, category: string = '') {
        if (this.shouldLog(LogLevel.DEBUG, category)) {
            console.debug(this.formatMessage(LogLevel.DEBUG, category, message));
        }
    }

    trace(message: any, category: string = '') {
        if (this.shouldLog(LogLevel.TRACE, category)) {
            console.trace(this.formatMessage(LogLevel.TRACE, category, message));
        }
    }
}

export const logger = Logger.getInstance(); 