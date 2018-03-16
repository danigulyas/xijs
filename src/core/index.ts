import { Observable } from "rxjs/Observable";
import XiEvent from "~/core/message/XiEvent";
import XiProcessConfiguration from "~/configuration/XiProcessConfiguration";

/** 
 * Responsible for starting, stopping the Xi process, an event listener for events and a client for posting requests.
 */
export default interface XiCore {
  readonly events: Observable<XiEvent>;

  constructor(configuration: XiProcessConfiguration) : XiCore;
}