import express from "express";

import { usersControllers } from "../../controllers/index.js";

import { usersValidation } from "../../middleware/validation/index.js";

const authRouter = express.Router();

authRouter.post("/signup", usersValidation.userSignupValidate, usersControllers.signup);

authRouter.post("/signin", usersValidation.userSigninValidate, usersControllers.signin);

export default authRouter;
