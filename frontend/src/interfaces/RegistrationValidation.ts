import { InputValidation, Validation } from './InputValidation';

export interface RegistrationValidation extends InputValidation {
    firstName: Validation;
    lastName: Validation;
    email: Validation;
    password: Validation;
    repeatedPassword: Validation;
}
