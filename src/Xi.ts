import View from "~/View";

/**
 * The main class for interacting with Xi.js.
 */
export default interface Xi {
  /**
   * Starts the Xi process and the plugins.
   * @param clientExtrasPath is the path where the plugins reside,
   *  if not set defaults to the directory of the prebuilt Xi binary.
   */
  start(clientExtrasPath?: string): void;

  /**
   * Stops the Xi process.
   */
  stop(): void;

  /**
   * Creates a View, a View represents an open document in Xi, you can interact with the document through it.
   *
   * @see View
   * @param path of the file to load, if empty, a new file will be created which can be saved later.
   * @return a promise to a view.
   */
  createView(path?: string): Promise<View>;

  /**
   * Closes the view at Xi, you can't use the view afterwards.
   *
   * @param view to be closed.
   */
  closeView(view: View): void;
}
