import { badRequest, serverError } from '../helpers/http-helper';
import { Controller, EmailValidator, httpResponse, httpRequest } from '../protocols';
import { InvalidParamError, MissingParamError } from '../errors';
import { AddAccount } from '../../domain/usecases/add-account';

export default class SignUpController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly addAccount: AddAccount,
  ) {}

  handle(httpRequest: httpRequest): httpResponse {
    try {
      const { name, email, password, passwordConfirmation } = httpRequest.body;

      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) return badRequest(new MissingParamError(field));
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'));
      }

      const isValid = this.emailValidator.isValid(email);
      if (!isValid) {
        return badRequest(new InvalidParamError('email'));
      }

      this.addAccount.add({
        name,
        email,
        password,
      });

      return {
        statusCode: 200,
        body: {},
      };
    } catch (error) {
      return serverError();
    }
  }
}
