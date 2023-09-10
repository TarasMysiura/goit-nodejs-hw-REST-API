import contactsSchemas from "../../schemas/contacts-schemas.js";

import validate from "../../decorators/index.js";

const addContactValidate = validate.validateBody(contactsSchemas.contactAddSchema);
const updateContactValidate = validate.validateBody(contactsSchemas.contactUpdateSchema);
const updateContactFavoriteValidate = validate.validateBodyFavorite(contactsSchemas.contactUpdateFavoriteSchema);


export default {
  addContactValidate,
  updateContactValidate,
  updateContactFavoriteValidate,
};