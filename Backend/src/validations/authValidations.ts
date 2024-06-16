import Joi from 'joi';

const signupValidationSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    
    contactMode: Joi.string().valid('phone', 'email'),
});

const signinValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

export { signupValidationSchema, signinValidationSchema };
