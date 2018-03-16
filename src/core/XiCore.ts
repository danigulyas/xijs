import { Observable, Subject } from "rxjs";
import XiProcessConfiguration from "configuration/XiProcessConfiguration";
import XiNotification from "core/message/XiNotification";

/** 
 * Responsible for starting, stopping the Xi process, an event listener for events and a client for posting requests.
 */
export default interface XiCore {
  readonly notifications: Observable<XiNotification>;

  constructor(configuration: XiProcessConfiguration) : XiCore;
}