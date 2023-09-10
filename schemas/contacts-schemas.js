import Joi from "joi";

export const validatePhoneRegex =
  /^[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/; //"123-456-7890"

const contactAddSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "any.required": `"name" must be exist`,
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().regex(validatePhoneRegex).required().messages({
    "string.pattern.base": `Phone number must have schema "(***) ***-****".`,
  }),
  favorite: Joi.boolean(),
});

const contactUpdateSchema = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email(),
  phone: Joi.string().regex(validatePhoneRegex).messages({
    "string.pattern.base": `Phone number must have schema "(***) ***-****".`,
  }),
  favorite: Joi.boolean(),
});

const contactUpdateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required().messages({"any.required": `missing field favorite`}),
});

export default {
  contactAddSchema,
  contactUpdateSchema,
  contactUpdateFavoriteSchema,
};
