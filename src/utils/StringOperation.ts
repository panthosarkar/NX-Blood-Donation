export class StringOperation {
  static capitalizeFirstLetter(string: string): string {
    if (!string) return "";

    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  static getLogoText(string: string): string {

    if (!string) return "BC";

    const words = string.split(" ");
    const firstLetter = words[0].charAt(0).toUpperCase() || "";
    const secondLetter = words[1]?.charAt(0).toUpperCase() || "";
    return firstLetter + secondLetter;
  }

  static capitalizeSentence(sentence: string | null | undefined): string {
    return (sentence || "")
      .split(" ")
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  static toEncodedUrlString(string: string): string {
    return encodeURIComponent(string);
  }

  static toDecodedUrlString(string: string): string {
    return decodeURIComponent(string);
  }

  static toSlug(string: string): string {
    let result = string
      .toLowerCase()
      // Replace & with -&-
      .replace(/&/g, "-&-")
      // Replace all other unwanted characters with a hyphen
      .replace(/[\s'"`,.:;?!_/\\*+=<>|~@#$%^()\[\]{}]/g, "-")
      // Replace multiple consecutive hyphens with a single one
      .replace(/-+/g, "-")
      // Trim hyphens from start and end
      .replace(/^-+|-+$/g, "");

    return result;
  }

  static toEncryptedString(string: string | number): string {
    return Buffer.from(String(string), "utf-8").toString("base64");
  }
  static toDecryptedString(encoded: string): string {
    //-- remove the padding from the base64 encoded string
    const base64Decoded = Buffer.from(encoded, "base64").toString("utf-8") || "";
    const base64DecodedLength = base64Decoded.length;
    const paddingLength = base64DecodedLength % 4;

    const base64DecodedWithoutPadding = base64Decoded.slice(0, base64DecodedLength - paddingLength);

    return base64DecodedWithoutPadding;
  }

  static getJsonOrString(data: any): any {
    try {
      return JSON.parse(data);
    } catch (ex) {
      return data;
    }
  }
}
