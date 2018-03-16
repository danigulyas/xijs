import { assertEqual, assertType } from "~/util/ValidatorUtils";
import XiEvent from "~/core/message/XiEvent";

class AvailableThemesEvent implements XiEvent {
  public readonly themes: Array<string>;

  public constructor(themes: Array<string>) {
    this.themes = themes;
  }
}

namespace AvailableThemesEvent {
  export const METHOD = "available_themes";

  /**
   * Tries to instantiate itself from an object.
   * @throws if can't find necessary fields.
   * @return an instance of this.
   */
  export function from(obj: object) : AvailableThemesEvent {
    assertEqual(obj, "method", AvailableThemesEvent.METHOD);
    return new AvailableThemesEvent(assertType(obj, "params.themes", "array"));
  }
}

export default AvailableThemesEvent;