import Sendable from "~/core/message/Sendable";
import { assertType } from "~/util/ValidatorUtils";

/**
 * Used to serialize content going to Xi.
 */
export default abstract class Serializer {
  /**
   * Serializes objects before appending them to Xi's stdin.
   * @param obj to be serialized.
   * @return string which is ready to be written into Xi's stdin.
   */
  public static serialize(obj: Sendable) : string {
    if (typeof obj.serialize !== "function") throw new Error("Attempting to serialize something which is not Sendable, please implement Sendable.");
    return obj.serialize();
  }
}