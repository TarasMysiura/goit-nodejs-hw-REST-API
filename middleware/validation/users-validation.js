import { usersSchemas } from "../../schemas/index.js";

import validateBody from "../../decorators/index.js";

const userSignupValidate = validateBody.validateBody(
  usersSchemas.userSignupSchema
);
const userSigninValidate = validateBody.validateBody(
  usersSchemas.userSigninSchema
);

const usersValidation = {
  userSignupValidate,
  userSigninValidate,
};
export default usersValidation;
