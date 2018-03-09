import Style from "api/Style";
import Line from "api/Line";

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
  getLine(lineIx: number) : Line | null;

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
  getStyle(id: number) : Style | null;

  /**
   * Notifies Xi that an edit event happened.
   * @see EditEvent
   */
  edit(event: EditEvent) : void;

  /**
   * Notifies Xi that a character was inserted.
   * Note that **new lines should be routed separate** in the edit method above.
   * 
   * @param character is the character which was inserted.
   */
  insert(character: string) : void;

  /**
   * Notifies Xi to collapse current selections and cursors and dehighlight searches.
   */
  cancel() : void;

  /**
   * Notifies Xi about the current viewport, please call this whenever it changes so Xi can make sure there's up-to-date
   * data being displayed.
   * @param firstLine is the zero-based index of the first visible line. (line no - 1)
   * @param lastLine is the zero-based index of the last visible line. (line no - 1)
   */
  scroll(firstLine: number, lastLine: number) : void;

  /**
   * Notifies Xi that there was a click.
   * @see GestureModifier
   * @param line is the zero-based index of the line which was clicked on.
   * @param column is an utf-16 based code point offset where the click happened.
   * @param modifier marks modifiers for the operation, such as Shift / Select (so Xi knows to select text).
   * @param count is the amount of clicks happened.
   */
  click(line: number, column: number, modifier: GestureModifier, count: number) : void;

  /**
   * Notifies Xi that it should extend a selection until the given line and column "dragging".
   * @see GestureModifier
   * @param line is the zero-based index of the line where the dragging happened.
   * @param column is an utf-16 based code point offset where the use dragged the mouse.
   * @param modifier marks modifiers for the operation (like Shift / Select).
   */
  drag(line: number, column: number, modifier: GestureModifier) : void;

  /**
   * Notifies Xi that a gesture have happened, in the future, `click` and `drag` will become gestures.
   * @see GestureType
   * @param line is a zero-based index of the line where the gesture happened.
   * @param column is an utf-16 based code point offset marking where the gesture happened.
   * @param type is the type of the gesture.
   */
  gesture(line: number, column: number, type: GestureType) : void;
}

/**
 * Represents an event the user made in the editor.
 * @see https://github.com/google/xi-editor/blob/master/docs/docs/frontend-protocol.md#edit-namespace
 */
export enum EditEvent {
  DeleteBackward = "delete_backward",
  DeleteForward = "delete_forward",
  InsertNewline = "insert_newline",
  MoveUp = "move_up",
  MoveUpAndModifySelection = "move_up_and_modify_selection",
  MoveDown = "move_down",
  MoveDownAndModifySelection = "move_down_and_modify_selection",
  MoveLeft = "move_left",
  MoveLeftAndModifySelection = "move_left_and_modify_selection",
  MoveRight = "move_right",
  MoveRightAndModifySelection = "move_right_and_modify_selection",
  ScrollPageUp = "scroll_page_up",
  PageUp = "page_up",
  PageUpAndModifySelection = "page_up_and_modify_selection",
  ScrollPageDown = "scroll_page_down",
  PageDown = "page_down",
  PageDownAndModifySelection = "page_down_and_modify_selection"
}

export enum GestureType {
  TOGGLE_SELECTION = "toggle_sel"
}

export enum GestureModifier {
  NO_MODIFIER = 0,
  SELECT = 2
}