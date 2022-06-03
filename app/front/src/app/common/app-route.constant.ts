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
  static readonly PAGE_NOT_FOUND = '404';
  static readonly OTHER = '**';

  static readonly FULL_PAGE_ROUTE_PATTERN_LIST = [/^\/login$/, /^\/signup$/, /^\/note/];

  static readonly ANONYMOUS_PAGE_ROUTE_PATTERN_LIST = [/^\/login$/, /^\/signup$/, /^\/feature$/, /^\/note$/]

  static readonly FACEBOOK_CONTACT = 'https://www.facebook.com/phatduong.2000';
  static readonly YOUTUBE_CONTACT = 'https://www.youtube.com/channel/UCiLW5PeFvqzyqEV70DXgCtg';
  static readonly INSTAGRAM_CONTACT = 'https://www.instagram.com/beebapcay';
  static readonly GITHUB_CONTACT = 'https://github.com/beebapcay';

  static readonly MAIL_CONTACT = 'mailto:beebapcay@gmail.com';
}
