import { usersSchemas } from "../../schemas/index.js";

import validateBody from "../../decorators/index.js";

const userSignupValidate = validateBody.validateBody(
  usersSchemas.userSignupSchema
);
const userSigninValidate = validateBody.validateBody(
  usersSchemas.userSigninSchema
);
const userEmailValidate = validateBody.validateBody(
  usersSchemas.userEmailSchema
);

const usersValidation = {
  userSignupValidate,
  userSigninValidate,
  userEmailValidate,
};
export default usersValidation;
