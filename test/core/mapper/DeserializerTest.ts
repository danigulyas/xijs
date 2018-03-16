import Deserializer from "~/core/mapper/Deserializer";

describe("The Deserializer", () => {
  it("should correctly guess a response", () => {
    expect(Deserializer.isResponse({})).toEqual(false);
    expect(Deserializer.isResponse({"method": "whatev", "params": {"a": 1}})).toEqual(false);
    expect(Deserializer.isResponse({"id": 0})).toEqual(false);
    expect(Deserializer.isResponse({"id": 0, "result": {"a": 1}})).toEqual(true);
  });
});