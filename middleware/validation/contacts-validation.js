import { contactsSchemas } from "../../schemas/index.js";

import validateBody from "../../decorators/index.js";

const addContactValidate = validateBody.validateBody(
  contactsSchemas.contactAddSchema
);
const updateContactValidate = validateBody.validateBody(
  contactsSchemas.contactUpdateSchema
);
const updateContactFavoriteValidate = validateBody.validateBodyFavorite(
  contactsSchemas.contactUpdateFavoriteSchema
);

const updateContactAvatarValidate = validateBody.validateBodyAvatar(
  contactsSchemas.contactUpdateAvatarSchema
);

const contactsValidation = {
  addContactValidate,
  updateContactValidate,
  updateContactFavoriteValidate,
  updateContactAvatarValidate,
};
export default contactsValidation;
