import { assertEqual, assertType } from "~/util/ValidatorUtils";
import XiEvent from "~/core/message/XiEvent";

class PluginStartedEvent implements XiEvent {
  public readonly viewId: string;
  public readonly name: string;

  /**
   * Xi fires this event when a plugin is started.
   * @param viewId is the id of the view.
   * @param name is the name of the plugin.
   */
  public constructor(viewId: string, name: string) {
    this.viewId = viewId;
    this.name = name;
  }
}

namespace PluginStartedEvent {
  export const METHOD: string = "plugin_started";

  /**
   * Tries to instantiate itself from an object.
   * @throws if can't find necessary fields.
   * @return an instance of this.
   */
  export function from(obj: object) : PluginStartedEvent {
    assertEqual(obj, "method", PluginStartedEvent.METHOD);
    
    return new PluginStartedEvent(
      assertType(obj, "params.view_id", "string"),
      assertType(obj, "params.plugin", "string")
    ); 
  }
}

export default PluginStartedEvent;