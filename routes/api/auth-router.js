import express from "express";

import { authControllers } from "../../controllers/index.js";

import {
  authenticate,
  usersValidation,
} from "../../middleware/validation/index.js";

const authRouter = express.Router();

authRouter.post(
  "/register",
  usersValidation.userSignupValidate,
  authControllers.signup
);

authRouter.post(
  "/login",
  usersValidation.userSigninValidate,
  authControllers.signin
);
authRouter.post("/logout", authenticate, authControllers.signout);

authRouter.get("/current", authenticate, authControllers.getCurrent);

export default authRouter;
