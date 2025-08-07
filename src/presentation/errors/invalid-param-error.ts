export default class InvalidParamError extends Error {
  constructor(readonly param: string) {
    super(`Invalid param: ${param}`);
    this.name = 'InvalidParamError';
  }
}
