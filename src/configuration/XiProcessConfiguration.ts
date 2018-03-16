export default interface XiProcessConfiguration {
  /**
   * The working directory of Xi, where the config files are.
   * Defaults to the build/ dir here.
   */
  readonly xiCwd: string;

  /** 
   * Absolute path to the binary of Xi (if you have a custom one),
   * Defaults to the pre-build binary here.
   */
  readonly xiBinary: string;
}