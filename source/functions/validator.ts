import validator from 'validator';
import { isEmpty } from 'lodash';

/** Validate inputs */
const validateSignupInput = async (data: any) => {
    const errors: any = {};

    if (validator.isEmpty(data.name)) {
        errors.name = 'Name field is required!';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Please enter a vaild email!';
    }
    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }
    if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

const validateLoginInput = async (data: any) => {
    const errors: any = {};

    if (validator.isEmpty(data.email)) {
        errors.email = 'Email field is required!';
    }
    if (!validator.isEmail(data.email)) {
        errors.email = 'Please enter a vaild email!';
    }
    if (validator.isEmpty(data.password)) {
        errors.password = 'Password field is required!';
    }
    if (data.password.length < 8) {
        errors.password = 'Password must be at least 8 characters';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};

export default { validateSignupInput, validateLoginInput };