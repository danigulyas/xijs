import XiProcessConfiguration from "configuration/XiProcessConfiguration";
import { Subject, Observable } from "rxjs";

/** 
 * Responsible for starting, stopping and extracting input / output from the Xi process. 
 */
export default interface XiProcess {
  readonly stdout: Observable<string>;
  readonly stderr: Observable<string>;

  constructor(configuration: XiProcessConfiguration) : XiProcess;
  
  start() : void;
  stop() : void;
  send(payload: Sendable) : void;
}