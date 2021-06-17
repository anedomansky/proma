export interface Validation {
    value: string;
    valid: boolean;
}

export interface InputValidation {
    [key: string]: Validation;
}
