import _ from 'lodash';

export class ArrayUtil {
  static isEmpty(array: any[]): boolean {
    return _.isEmpty(array);
  }
}
