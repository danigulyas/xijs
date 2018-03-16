/**
 * Line represents a line in a View.
 * @see View
 */
export default interface Line {
  /**
   * The text in the line.
   */
  readonly text: string;

  /**
   * A set of UTF-16 code point offsets in `text`, representing cursor locations.
   */
  readonly cursors: Array<number>;

  /**
   * A set of UTF-16 code point ranges in `text`, representing styling information.
   * @see Style 
   * @see View#getStyle
   */
  readonly styles: Array<StyleSpan>;

  /**
   * @return true if there's at least one cursor in this line.
   */
  hasCursor() : boolean;
}

/**
 * Belongs to a Line.
 */
export interface StyleSpan {
  /**
   * The id of the style, you can request further details from the View.
   */
  readonly id: number;

  /**
   * The start of the style in UTF-16 code points.
   */
  readonly startOffset: number;

  /**
   * The point until the style should be applied in UTF-16 code points.
   */
  readonly endOffset: number;
}