import { TextEncoder, TextDecoder } from "text-encoding";

export default abstract class TextUtils {
  private static readonly encoder: TextEncoder = new TextEncoder("utf-8");
  private static readonly decoder: TextDecoder = new TextDecoder("utf-8");

  /**
   * Unicode is an encoding standard, it's a big array of code points (characters), it's 65th code point is the latin, 
   * upper case 'A'. Since people want to store text and want to pay as less as posible for storage they made some clever
   * designs to "serialize" this.
   * 
   * UTF-32 is a fixed-length encoding for Unicode storing 4 bytes per code point, covering all possible values for unicode,
   * but people were smart and they thought out, but then people realized that most part of this is empty bytes (space for 
   * the really rare but possible characters), so they made encodings which supports shorter and longer characters too, they
   * called those variable-length encodings. UTF-16 stores 2 bytes, UTF-8 stores 1 byte per code-point, but since this
   * doesn't cover the full spectrum of Unicode, they had to do some tricks, sometimes, there's two code points, which
   * actually mean one "character". Emojis are typical examples of this, let me show why it's a problem and why is it
   * really important to convert from UTF-8 code point offsets to UTF-16 code point offsets: 
   * 
   * Consider this example: hello❤️bello
   * If you do 'hello❤️bello'.length, it says 12 (the amount of code points based on UTF-16 in the string), the heart emoji
   * counts for two in UTF-16 because it can be represented in 2x2 bytes (2 code points).
   * 
   * But since UTF-8 uses 1 byte per code point, if you would to say: convertToUTF8CodePoints('hello❤️bello') it would say 14!
   * 
   * You see how this can cause trouble, given that Xi sends UTF-8 code point offsets for everything
   * and JavaScript is based on UTF-16, hopefully it seems easy to convert, see below.
   * 
   * @param str is the string which the code point is generated from.
   * @param offset is the offset in UTF-8 code points.
   */
  public static convertCodePointOffsetToUTF16(str: string, offset: number) : number {
    return this.decoder.decode(this.encoder.encode(str).subarray(offset)).length;
  }

  /**
   * This is exactly the same as the opposite as reverse, exactly the same importance, see above.
   * 
   * @param str is the string which the code point relates to.
   * @param offset is a code point offset in UTF-16.
   */
  public static convertCodePointOffsetToUTF8(str: string, offset: number) : number {
    return this.encoder.encode(str.substr(0, offset)).length;
  }
}