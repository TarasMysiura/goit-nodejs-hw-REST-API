import express from "express";

import contactsControllers from "../../controllers/contacts-controllers.js";

import contactsValidation, {isValidId} from "../../middleware/validation/index.js";

// import  from "../../middleware/validation/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", isValidId, contactsControllers.getByID);

contactsRouter.post("/",contactsValidation.addContactValidate, contactsControllers.add);

contactsRouter.put("/:id", isValidId, contactsValidation.updateContactValidate, contactsControllers.updateById);

contactsRouter.patch("/:id/favorite", isValidId, contactsValidation.updateContactFavoriteValidate, contactsControllers.updateById);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

export default contactsRouter;
