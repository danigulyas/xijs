import { assertType } from "~/util/ValidatorUtils";
import XiEvent from "~/core/message/XiEvent";
import AvailablePluginsEvent from "~/core/message/event/AvailablePluginsEvent";
import AvailableThemesEvent from "~/core/message/event/AvailableThemesEvent";
import PluginStartedEvent from "~/core/message/event/PluginStartedEvent";
import DefStyleEvent from "~/core/message/event/DefStyleEvent";
import ScrollToEvent from "~/core/message/event/ScrollToEvent";
import XiResponse from "~/core/message/XiResponse";

/**
 * Used to deserialize messages from Xi.
 */
export default abstract class Deserializer {
  /**
   * @param obj to be inspected.
   * @return true if the object is a response.
   */
  public static isResponse(obj: object) : boolean {
    return ("id" in obj && "result" in obj);
  }

  /**
   * Deserializes an object from a Xi message.
   * @throws if can't deserialize the object.
   * @param obj to be deserialized.
   * @return the deserialized event.
   */
  public static deserializeEvent(obj: object) : XiEvent {
    const method = assertType(obj, "method", "string");

    switch(method) {
      case AvailablePluginsEvent.METHOD: return AvailablePluginsEvent.from(obj);
      case AvailableThemesEvent.METHOD: return AvailableThemesEvent.from(obj);
      case PluginStartedEvent.METHOD: return PluginStartedEvent.from(obj);
      case DefStyleEvent.METHOD: return DefStyleEvent.from(obj);
      case ScrollToEvent.METHOD: return ScrollToEvent.from(obj);
      default: throw new Error(`Method name '${method}' is not recognized.`);
    }
  }

  /**
   * Deserializes an object from a Xi message.
   * @param obj to be deserialized
   * @return the deserialized response.
   */
  public static deserializeResponse(obj: object) : XiResponse {
    return XiResponse.from(obj);
  }
}