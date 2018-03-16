import Line from "~/Line";
import Style from "~/Style";

/**
 * The View represents a document ("an open tab") in Xi, it's the main point of interaction.
 */
export default interface View {
  /**
   * The identifier for the view, something like: view-1, view-3, etc, based on this you can distinguish different views.
   */
  readonly id: string;

  /**
   * When rendering lines, you can request one here.
   *
   * @param lineIx is the line number, zero indexed (9 for the 10th line).
   * @return a line instance, null if not found.
   */
  getLine(lineIx: number): Line | null;

  /**
   * Xi works with style spans, Lines are annotated with a bunch of them, but since styles are mostly reusable and cost a lot to send,
   * they are sent beforehand and stored in-memory in Xi.js, when you need to print Lines, spans on the line will reference styles
   * with id's, you can exchange those id's for actual Styles here.
   *
   * Style number 0 is reserved for selections, we'll not return any data for that.
   *
   * @param id of the style.
   * @return the requested style, null if not found.
   */
  getStyle(id: number): Style | null;

  /**
   * Notifies Xi that an edit event happened.
   * @see EditEvent
   */
  edit(event: EditEvent): void;

  /**
   * Notifies Xi that a character was inserted.
   * Note that **new lines should be routed separate** in the edit method above.
   *
   * @param character is the character which was inserted.
   */
  insert(character: string): void;

  /**
   * Notifies Xi to collapse current selections and cursors and dehighlight searches.
   */
  cancel(): void;

  /**
   * Notifies Xi about the current viewport, please call this whenever it changes so Xi can make sure there's up-to-date
   * data being displayed.
   * @param firstLine is the zero-based index of the first visible line. (line no - 1)
   * @param lastLine is the zero-based index of the last visible line. (line no - 1)
   */
  scroll(firstLine: number, lastLine: number): void;

  /**
   * Notifies Xi that there was a click.
   * @see GestureModifier
   * @param line is the zero-based index of the line which was clicked on.
   * @param column is an utf-16 based code point offset where the click happened.
   * @param modifier marks modifiers for the operation, such as Shift / Select (so Xi knows to select text).
   * @param count is the amount of clicks happened.
   */
  click(line: number, column: number, modifier: GestureModifier, count: number): void;

  /**
   * Notifies Xi that it should extend a selection until the given line and column "dragging".
   * @see GestureModifier
   * @param line is the zero-based index of the line where the dragging happened.
   * @param column is an utf-16 based code point offset where the use dragged the mouse.
   * @param modifier marks modifiers for the operation (like Shift / Select).
   */
  drag(line: number, column: number, modifier: GestureModifier): void;

  /**
   * Notifies Xi that a gesture have happened, in the future, `click` and `drag` will become gestures.
   * @see GestureType
   * @param line is a zero-based index of the line where the gesture happened.
   * @param column is an utf-16 based code point offset marking where the gesture happened.
   * @param type is the type of the gesture.
   */
  gesture(line: number, column: number, type: GestureType): void;

  /**
   * Subscribes to given events, see specifics below.
   * @param event is the event you're interested in.
   * @param callback is the function which will be called once this event occurs.
   */
  subscribe(event: ViewEvent, callback: () => void): void;

  /**
   * Saves the file to the given path.
   * @param path of the file to save to (obtainable by getConfig()).
   */
  save(path: string): void;

  /**
   * Subscribes to scroll requests from Xi to the front-end, this can happen for example when the front-end
   * sends the signal that the user is selecting something with shift and moved down with the arrow keys,
   * Xi knows if it's already at the bottom of the page and will request a scroll.
   *
   * In this case, the callback will be called with an object representing the zero-based line index and
   * the UTF-16 code point offset.
   */
  subscribe(event: ViewEvent.SCROLL_REQUESTED, callback: (arg: { line: number, column: number }) => void): void;

  /**
   * Subscribes to the update event, where the document was changed and updates to the line cache was processed,
   * makes a good subscription for pushing tasks into the render queue.
   */
  subscribe(event: ViewEvent.LINES_UPDATED, callback: () => void): void;
}

/**
 * Represents requests from Xi to the front-end.
 */
export enum ViewEvent {
  SCROLL_REQUESTED,
  LINES_UPDATED,
}

/**
 * Represents an event the user made in the editor.
 * @see https://github.com/google/xi-editor/blob/master/docs/docs/frontend-protocol.md#edit-namespace
 */
export enum EditEvent {
  DELETE_BACKWARD = "delete_backward",
  DELETE_FORWARD = "delete_forward",
  INSERT_NEWLINE = "insert_newline",
  MOVE_UP = "move_up",
  MOVE_UP_AND_MODIFY_SELECTION = "move_up_and_modify_selection",
  MOVE_DOWN = "move_down",
  MOVE_DOWN_AND_MODIFY_SELECTION = "move_down_and_modify_selection",
  MOVE_LEFT = "move_left",
  MOVE_LEFT_AND_MODIFY_SELECTION = "move_left_and_modify_selection",
  MOVE_RIGHT = "move_right",
  MOVE_RIGHT_AND_MODIFY_SELECTION = "move_right_and_modify_selection",
  SCROLL_PAGE_UP = "scroll_page_up",
  PAGE_UP = "page_up",
  PAGE_UP_AND_MODIFY_SELECTION = "page_up_and_modify_selection",
  SCROLL_PAGE_DOWN = "scroll_page_down",
  PAGE_DOWN = "page_down",
  PAGE_DOWN_AND_MODIFY_SELECTION = "page_down_and_modify_selection",
}

export enum GestureType {
  TOGGLE_SELECTION = "toggle_sel",
}

export enum GestureModifier {
  NO_MODIFIER = 0,
  SELECT = 2,
}
