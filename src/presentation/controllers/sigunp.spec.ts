import SignUpController from './signup';
import MissingParamError from '../errors/missing-param-error';

describe('SignUp Controller', () => {
  test('Should return 400 if no name is provided', () => {
    // System Under Test
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        // name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpReponse = sut.handle(httpRequest);
    expect(httpReponse.statusCode).toBe(400);
    expect(httpReponse.body).toEqual(new MissingParamError('name'));
  });

  test('Should return 400 if no email is provided', () => {
    // System Under Test
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        // email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpReponse = sut.handle(httpRequest);
    expect(httpReponse.statusCode).toBe(400);
    expect(httpReponse.body).toEqual(new MissingParamError('email'));
  });

  test('Should return 400 if no password is provided', () => {
    // System Under Test
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        // password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };
    const httpReponse = sut.handle(httpRequest);
    expect(httpReponse.statusCode).toBe(400);
    expect(httpReponse.body).toEqual(new MissingParamError('password'));
  });

  test('Should return 400 if no passwordConfirmation is provided', () => {
    // System Under Test
    const sut = new SignUpController();
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        // passwordConfirmation: 'any_password',
      },
    };
    const httpReponse = sut.handle(httpRequest);
    expect(httpReponse.statusCode).toBe(400);
    expect(httpReponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });
});
