export class AppRouteConstant {
  static readonly APP_NAME = 'Notemon';
  static readonly ROOT = '/';
  static readonly HOME = '';
  static readonly LOGIN = 'login';
  static readonly SIGNUP = 'signup';
  static readonly FEATURE = 'feature';
  static readonly DASHBOARD = 'dashboard';
  static readonly DIRECTORY = 'directory';
  static readonly NOTE = 'note';
  static readonly SHARE = 'share';
  static readonly CONTACT_US = 'contact-us';
  static readonly OTHER = '**';

  static readonly FULL_PAGE_ROUTE_PATTERN_LIST = [/^\/login$/, /^\/signup$/, /^\/note/];

  static readonly ANONYMOUS_PAGE_ROUTE_PATTERN_LIST = [/^\/login$/, /^\/signup$/, /^\/feature$/, /^\/note$/]
}
