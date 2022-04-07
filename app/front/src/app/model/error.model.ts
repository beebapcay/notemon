import {ErrorCodeEnum} from '../enum/error-code.enum';
import {ErrorMessageEnum} from '../enum/error-message.enum';

export class ErrorModel {
  constructor(
    public code: ErrorCodeEnum | null = null,
    public message: ErrorMessageEnum | string | null = null,
  ) {
  }
}

export class PageNotFoundErrorModel extends ErrorModel {
  constructor() {
    super(ErrorCodeEnum.NotFound, ErrorMessageEnum.NotFound);
  }

  public static create(): PageNotFoundErrorModel {
    return new PageNotFoundErrorModel();
  }
}

export class NotSupportedErrorModel extends ErrorModel {
  constructor() {
    super(ErrorCodeEnum.NotSupported, ErrorMessageEnum.NotSupported);
  }

  public static create(): NotSupportedErrorModel {
    return new NotSupportedErrorModel();
  }
}
