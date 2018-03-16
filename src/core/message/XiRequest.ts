import Sendable from "~/core/message/Sendable";

/**
 * Request from Xi.
 */
export default abstract class XiRequest implements Sendable { 
  public readonly id: number;
  public readonly method: string;

  constructor(id: number, method: string) {
    this.id = id;
    this.method = method;
  }

  public abstract serialize() : string;
}