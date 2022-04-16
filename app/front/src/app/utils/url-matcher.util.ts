export class UrlMatcherUtil {
  public static match(url: string, patterns: string[]): boolean {
    for (const pattern of patterns) {
      if (url.includes(pattern)) {
        return true;
      }
    }
    return false;
  }
}
