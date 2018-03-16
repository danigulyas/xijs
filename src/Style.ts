/**
 * A Style represent a way to format text and it's surroundings, all colors coming from Xi is in ARGB format.
 */
export default interface Style {
  /**
   * The identifier of the style, so it can be resolved once referenced from a Line.
   */
  readonly id: number;

  /**
   * The color of the foreground, optional.
   */
  readonly foregroundColor?: number;

  /**
   * The color of the background.
   * The default value is 0.
   */
  readonly backgroundColor?: number;

  /**
   * Font weight.
   * The default value is 400.
   */
  readonly weight?: number;

  /**
   * Marks if the text should be italic.
   * The default value is false.
   */
  readonly italic?: boolean;

  /**
   * Marks if the text should be underlined.
   * The default value is false.
   */
  readonly underline?: boolean;
}
