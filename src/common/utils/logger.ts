import winston, { format } from 'winston';

class Logger {
    fileName: string;
    outdir: string;

    constructor(filename: string, outDir: string) {
        this.fileName = filename;
        this.outdir = outDir;
    }

    public getLogger(): winston.Logger {
        return winston.createLogger(this.getLoggerConfiguration());
    }

    private getLoggerConfiguration() {
        return {
            transports: [
                new winston.transports.File({
                    level: 'error',
                    filename: `${this.outdir}Error.log`,
                    format: format.combine(
                        format.label({ label: this.fileName }),
                        format.timestamp({
                            format: 'MMM-DD-YYYY HH:mm:ss',
                        }),
                        format.printf(
                            (info) =>
                                `${info.label}: ${info.level}: ${[info.timestamp]}: ${info.message}`
                        ),
                        format.align()
                    ),
                }),
                new winston.transports.File({
                    level: 'info',
                    filename: `${this.outdir}Info.log`,
                    format: format.combine(
                        format.label({ label: this.fileName }),
                        format.timestamp({
                            format: 'MMM-DD-YYYY HH:mm:ss',
                        }),
                        format.printf(
                            (info) =>
                                `${info.label}: ${info.level}: ${[info.timestamp]}: ${info.message}`
                        ),
                        format.align(),
                        format.simple()
                    ),
                }),
            ],
        };
    }
}

export { Logger };
