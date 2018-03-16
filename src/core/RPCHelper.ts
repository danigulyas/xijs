export default interface RPCEventListener {
  /** 
   * Returns the next request id.
   */
  getNextRequestId() : number;

  
}