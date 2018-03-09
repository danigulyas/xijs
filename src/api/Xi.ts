import View from "api/View";

/**
 * The main class for interacting with Xi.js.
 */
export default interface Xi {
  /**
   * Starts the Xi process and the plugins.
   */
  start() : void;

  /**
   * Stops the Xi process.
   */
  stop() : void;

  /**
   * Creates a View, a View represents an open document in Xi, you can interact with the document through it.
   * 
   * @see View
   * @param path of the file to load, if empty, a new file will be created which can be saved later.
   * @return a promise to a view.
   */
  createView(path?: string) : Promise<View>;
}