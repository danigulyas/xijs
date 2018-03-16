import { assertEqual, assertType, assertTypeIfPresent } from "~/util/ValidatorUtils";
import XiEvent from "~/core/message/XiEvent";
import Style from "~/Style";

class SetStyleEvent implements XiEvent {
  public readonly style: Style;

  /**
   * Xi fires this event when a new style is deployed (theme changed, etc), the client must save the style by it's id
   * for future reference (in {@see Line#Style styles of line}).
   * @param style is the style to be set.
   */
  public constructor(style: Style) {
    this.style = style;
  }
}

namespace SetStyleEvent {
  export const METHOD = "set_style";

  /**
   * Tries to instantiate itself from an object.
   * @throws if can't find necessary fields.
   * @return an instance of this.
   */
  export function from(obj: object) : SetStyleEvent {
    assertEqual(obj, "method", SetStyleEvent.METHOD);
    
    const style: Style = {
      id: assertType(obj, "params.id", "number"),
      foregroundColor: assertTypeIfPresent(obj, "params.fg_color", "number"),
      backgroundColor: assertTypeIfPresent(obj, "params.bg_color", "number"),
      weight: assertTypeIfPresent(obj, "params.weight", "number"),
      italic: assertTypeIfPresent(obj, "params.italic", "boolean"),
      underline: assertTypeIfPresent(obj, "params.underline", "boolean")
    };

    return new SetStyleEvent(style);
  }
}

export default SetStyleEvent;