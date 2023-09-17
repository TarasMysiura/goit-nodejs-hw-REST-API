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
  "/signin",
  usersValidation.userSigninValidate,
  authControllers.signin
);

authRouter.get("/current", authenticate, authControllers.getCurrent);

authRouter.post("/signout", authenticate, authControllers.signout);

export default authRouter;
