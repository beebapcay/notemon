export class StringUtil {
  static getUnexpectedCharacterFromString(str: string, regExp: RegExp): string[] {
    return Array
      .from(str)
      .filter(char => !regExp.test(char))
      .filter((char, index, self) => self.indexOf(char) === index)
  }
}
