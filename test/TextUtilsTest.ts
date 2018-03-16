import { expect } from "chai";
import TextUtils from "../src/util/TextUtils";

describe("In the TextUtils class", () => {
  const emojiString = 'haha🏄🏿juhuu👍🏿qq';
  
  it("convertCodePointOffsetToUTF16() should convert correctly", () => {
    // The amount of code points in UTF-8 till the offset is 12, (emoji is 8 code points, 4 for the surfer, 4 for the modifier).
    // The amount of code points in UTF-16 till the offset is 8, (emoji is 4 code points, 2 for the surfer, 2 for the modifier).
    expect(TextUtils.convertCodePointOffsetToUTF16(emojiString, 12)).to.equal(8);
  });

  it("convertCodePointOffsetToUTF8() should convert correctly", () => {
    // The reverse of the above.
    expect(TextUtils.convertCodePointOffsetToUTF8(emojiString, 8)).to.equal(12);
  });
})