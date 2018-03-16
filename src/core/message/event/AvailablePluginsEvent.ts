import { assertEqual, assertType } from "~/util/ValidatorUtils";
import XiEvent from "~/core/message/XiEvent";

class AvailablePluginsEvent implements XiEvent {
  public readonly viewId: string;
  public readonly plugins: Array<AvailablePluginsEvent.Plugin>;

  /**
   * Xi fires this event once the list of available plugins change.
   * @param viewId is the id of the view.
   * @param plugins is the list of currently available plugins.
   */
  public constructor(viewId: string, plugins: Array<AvailablePluginsEvent.Plugin>) {
    this.viewId = viewId;
    this.plugins = plugins;
  }
}

namespace AvailablePluginsEvent {
  export const METHOD: string = "available_plugins";

  export abstract class Plugin {
    abstract readonly name: string;
    abstract readonly running: boolean;
  }

  /**
   * Tries to instantiate itself from an object.
   * @throws if can't find necessary fields.
   * @return an instance of this.
   */
  export function from(obj: object) : AvailablePluginsEvent {
    assertEqual(obj, "method", AvailablePluginsEvent.METHOD);
    
    return new AvailablePluginsEvent(
      assertType(obj, "params.view_id", "string"),
      assertType(obj, "params.plugins", "array")
    ); 
  }
}

export default AvailablePluginsEvent;