import TextUtils from "~/util/TextUtils";

const emojiString = 'haha🏄🏿juhuu👍🏿qq';

test("convertCodePointOffsetToUTF16() should convert correctly", () => {
  // The amount of code points in UTF-8 till the offset is 12, (emoji is 8 code points, 4 for the surfer, 4 for the modifier).
  // The amount of code points in UTF-16 till the offset is 8, (emoji is 4 code points, 2 for the surfer, 2 for the modifier).
  expect(TextUtils.convertCodePointOffsetToUTF16(emojiString, 12)).toEqual(8);
});

test("convertCodePointOffsetToUTF8() should convert correctly", () => {
  // The reverse of the above.
  expect(TextUtils.convertCodePointOffsetToUTF8(emojiString, 8)).toEqual(12);
});