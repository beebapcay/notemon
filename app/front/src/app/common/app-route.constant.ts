export class AppRouteConstant {
  static readonly ROOT = '/';
  static readonly HOME = '';
  static readonly LOGIN = 'login';
  static readonly SIGNUP = 'signup';
  static readonly FEATURE = 'feature';
  static readonly NOTE = 'note';
  static readonly CONTACT_US = 'contact-us';
  static readonly OTHER = '**';

  static readonly FULL_PAGE_ROUTE_PATTERN_LIST = [/^\/login$/, /^\/signup$/, /^\/note/]
}
