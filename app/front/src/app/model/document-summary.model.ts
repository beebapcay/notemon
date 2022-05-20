export class DocumentSummaryModel {
  constructor(public sectionTime: number = 0,
              public documentTime: number = 0,
              public words: number = 0,
              public characters: number = 0,
              public page: number = 0) {
  }

  static create(): DocumentSummaryModel {
    return new DocumentSummaryModel(0, 0, 0, 0, 0);
  }
}
