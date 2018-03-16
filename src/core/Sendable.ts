export default interface Sendable {
  /** 
   * Serializes the payload to a format understandable by the Xi process.
   * This is a JSON payload, in a single line, terminated by \r\n. 
   */
  serialize() : string;
}