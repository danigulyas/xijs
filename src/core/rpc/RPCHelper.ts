import XiResponse from "~/core/message/XiResponse";

export default class RPCHelper {
  private lastRequestId = 0;
  private subscriptions: Map<Number, Array<ResponseCallback>>;

  constructor() {
    this.subscriptions = new Map();
  }

  /** 
   * Returns the next request id.
   */
  public getNextRequestId() : number {
    this.lastRequestId += 1;
    return this.lastRequestId;
  }

  /**
   * Checks if there's listeners for a response id, if there's any, it'll call them.
   * @param response to emit.
   */
  public handle(response: XiResponse) {
    const subscribers = this.subscriptions.get(response.id);
    
    if (subscribers) {
      subscribers.forEach(cb => cb(response));
      this.subscriptions.delete(response.id);
    }
  }

  /**
   * Subscribes to a response.
   * @param requestId is the id of the request.
   * @param callback is the function which will be called once there's a reply.
   */
  public subscribe(requestId: number, callback: ResponseCallback): void {
    const subscribers = this.subscriptions.get(requestId) || [];
    subscribers.push(callback);
    
    this.subscriptions.set(requestId, subscribers);
  };
}

export type ResponseCallback = (r: XiResponse) => void;