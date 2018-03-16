import { assertType, assertExist } from "~/util/ValidatorUtils";

export default class XiResponse {
  public readonly id: number;
  public readonly result: any;

  /**
   * Sent by Xi as a response to a call with the given id.
   * @param id of the request.
   * @param result of the request.
   */
  private constructor(id: number, result: any) {
    this.id = id;
    this.result = result;
  }
  
  /**
   * Tries to instantiate itself from an object.
   * @throws if can't find necessary fields.
   * @return an instance of this.
   */
  public static from(obj: object) : XiResponse {
    return new XiResponse(
      assertType(obj, "id", "number"), 
      assertExist(obj, "result")
    );
  }
}