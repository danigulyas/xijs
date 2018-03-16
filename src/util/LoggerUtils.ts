import * as Pino from "pino";

const FORMATTER = Pino.pretty();
FORMATTER.pipe(process.stdout);

export default abstract class LoggerUtils {
  /**
   * Returns a logger instance.
   * @param name of the logger.
   */
  public static getLogger(name: string) : Pino.Logger  {
    return Pino({ name, level: "trace" }, FORMATTER);
  }
}