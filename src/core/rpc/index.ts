import XiResponse from "~/core/message/XiResponse";

export default interface XiRPC {
  /** 
   * Returns the next request id.
   */
  getNextRequestId() : number;

  /**
   * Checks if there's listeners for a response id, if there's any, it'll call them.
   * @param response to emit.
   */
  handle(response: XiResponse) : void;

  /**
   * Subscribes to a response.
   * @param requestId is the id of the request.
   * @param callback is the function which will be called once there's a reply.
   */
  subscribe<T extends XiResponse>(requestId: number, callback: (response: T) => void): void;
}