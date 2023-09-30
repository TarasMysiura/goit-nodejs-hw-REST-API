import express from "express";

import { contactsControllers } from "../../controllers/index.js";

import {
  authenticate,
  contactsValidation,
  isValidId,
} from "../../middleware/validation/index.js";
import { uploadService } from "../../middleware/index.js";

const contactsRouter = express.Router();
contactsRouter.use(authenticate);

contactsRouter.get("/", contactsControllers.getAll);

contactsRouter.get("/:id", isValidId, contactsControllers.getByID);

contactsRouter.post(
  "/",
  uploadService.upload.single("avatar"),
  contactsValidation.addContactValidate,
  contactsControllers.add
);

contactsRouter.put(
  "/:id",
  isValidId,
  contactsValidation.updateContactValidate,
  contactsControllers.updateById
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  contactsValidation.updateContactFavoriteValidate,
  contactsControllers.updateById
);

contactsRouter.patch(
  "/:id/avatars",
  isValidId,
  uploadService.upload.single("avatar"),
  contactsValidation.updateContactAvatarValidate,
  contactsControllers.updateByIdAvatar
);

contactsRouter.delete("/:id", isValidId, contactsControllers.deleteById);

export default contactsRouter;
