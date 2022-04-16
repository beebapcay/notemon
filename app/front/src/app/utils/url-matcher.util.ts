export class UrlMatcherUtil {
  public static match(url: string, patterns: RegExp[]): boolean {
    for (const pattern of patterns) {
      if (pattern.test(url)) {
        return true;
      }
    }
    return false;
  }
}
