import { type Logger, createLogger, format, transports } from "winston";

class LoggerService {
  private static instance: LoggerService;
  private logger: Logger;

  private constructor() {
    const logFormat = format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.printf(
        ({ timestamp, level, message }) =>
          `[${timestamp}] ${level.toUpperCase()}: ${message}`,
      ),
    );

    const infoFilePath: string =
      process.env.NODE_ENV === "production"
        ? "logs/app.log"
        : "logs/app.development.log";

    const errorFilePath: string =
      process.env.NODE_ENV === "production"
        ? "logs/error.log"
        : "logs/error.development.log";

    this.logger = createLogger({
      level: "info",
      format: logFormat,
      transports: [
        new transports.Console({
          format: format.combine(format.colorize(), logFormat),
        }),
        new transports.File({
          filename: infoFilePath,
          level: "info",
        }),
        new transports.File({
          filename: errorFilePath,
          level: "error",
        }),
      ],
    });
  }

  public static getInstance(): LoggerService {
    if (!LoggerService.instance) {
      LoggerService.instance = new LoggerService();
    }
    return LoggerService.instance;
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public log(level: string, message: string): void {
    this.logger.log(level, message);
  }
}

export const loggerService = LoggerService.getInstance();
