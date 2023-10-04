import Joi from "joi";
export const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const userSignupSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userSigninSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
  password: Joi.string().min(6).required(),
});

export const userEmailSchema = Joi.object({
  email: Joi.string().pattern(emailRegexp).required(),
});

export const userRefreshTokenSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

const usersSchemas = {
  userSignupSchema,
  userSigninSchema,
  userEmailSchema,
  userRefreshTokenSchema,
};

export default usersSchemas;
