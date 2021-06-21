import { InputValidation, Validation } from './InputValidation';

export interface LoginValidation extends InputValidation {
    email: Validation;
    password: Validation;
}
