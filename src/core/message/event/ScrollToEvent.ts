import { assertEqual, assertType } from "~/util/ValidatorUtils";
import XiEvent from "~/core/message/XiEvent";

class ScrollToEvent implements XiEvent {
  public readonly viewId: string;
  public readonly column: number;
  public readonly line: number;

  /**
   * Fired when Xi asks the client to scroll to a given location.
   * @param viewId is the id of the view.
   * @param column is an UTF-8 code-point offset.
   * @param line is the 0-indexed line number.
   */
  public constructor(viewId: string, column: number, line: number) {
    this.viewId = viewId;
    this.column = column;
    this.line = line;
  }
}

namespace ScrollToEvent {
  export const METHOD: string = "scroll_to";

  /**
   * Tries to instantiate itself from an object.
   * @throws if can't find necessary fields.
   * @return an instance of this.
   */
  export function from(obj: object) : ScrollToEvent {
    assertEqual(obj, "method", ScrollToEvent.METHOD);
    
    return new ScrollToEvent(
      assertType(obj, "params.view_id", "string"),
      assertType(obj, "params.col", "number"),
      assertType(obj, "params.line", "number"),
    ); 
  }
}

export default ScrollToEvent;