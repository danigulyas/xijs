import Sendable from "~/core/message/Sendable";

/**
 * Request from Xi.
 */
export default abstract class XiRequest implements Sendable { 
  public readonly id: number;
  public readonly method: string;
  public abstract readonly params: object;

  constructor(id: number, method: string) {
    this.id = id;
    this.method = method;
  }

  public serialize() : string { return JSON.stringify({ id: this.id, method: this.method, params: this.params }); }
}