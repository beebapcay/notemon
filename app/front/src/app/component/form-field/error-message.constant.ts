export class FormFieldErrorMessageConstant {
  static readonly AUTHENTICATION = "Authentication failed. Your input credentials is wrong";
  static readonly REQUIRED = "This field is required";
  static readonly MAXLENGTH = "The value of this field must not exceed {{maxlength}} characters";
  static readonly MINLENGTH = "The value of this field must be at least {{minlength}} characters";
  static readonly MAX = "The value of this field must not exceed {{max}}";
  static readonly MIN = "The value of this field must be at least {{min}}";
  static readonly NUMERIC = "The value of this field must be a number";
  static readonly INVALID_TYPE = "The value of this field is not valid";
  static readonly INLINE_ANNOUNCE = "Some input fields have errors. Please check again";
  static readonly EMAIL = "The value of this field must be a valid email address";
  static readonly URL = "The value of this field must be a valid URL";
  static readonly DATE = "The value of this field must be a valid date";
  static readonly PHONE = "The value of this field must be a valid phone number";
  static readonly ZIPCODE = "The value of this field must be a valid zip code";
  static readonly UNEXPECTED_CHARACTERS = "The value of this field contains unexpected characters [{{characters}}]";
}
