import { badRequest, serverError } from '../helpers/http-helper';
import { Controller, EmailValidator, httpResponse, httpRequest } from '../protocols';
import { InvalidParamError, MissingParamError } from '../errors';

export default class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;
  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: httpRequest): httpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }

      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      return {
        statusCode: 200,
        body: {},
      };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return serverError();
    }
  }
}
