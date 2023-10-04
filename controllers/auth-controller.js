import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { nanoid } from "nanoid";

import { User } from "../models/index.js";

import { HttpError, sendEmail } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const { JWT_SECRET, BASE_URL } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const newUser = await User.create({
    ...req.body,
    password: hashPassword,
    verificationToken,
  });

  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${verificationToken}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);

  res.status(201).json({
    // username: newUser.username,
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

const signin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }
  if (!user.verify) {
    throw HttpError(401, "Email not verify");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Email or password is wrong");
  }
  const { _id: id } = user;

  const payload = {
    id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "10h" });
  await User.findByIdAndUpdate(id, { token });
  res.json({
    token,
    user: { email, subscription: user.subscription },
  });

  // const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
  // const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  // await User.findByIdAndUpdate(id, { accessToken, refreshToken });

  // res.json({
  //   accessToken,
  //   refreshToken,
  // });
};

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: " ",
  });

  res.json({
    message: "Verification successful",
  });
};

// const resendVerifyEmail = async (req, res) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });
//   if (!user) {
//       throw HttpError(404, "email not found")
//   }
//   if (user.verify) {
//       throw HttpError(400, "Email already verify")
//   }

//   const verifyEmail = {
//       to: email,
//       subject: "Verify email",
//       html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click to verify email</a>`
//   };
//   await sendEmail(verifyEmail);

//   res.json({
//       message: "Verify email resend success"
//   })
// }



const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }
  const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/users/verify/${user.verificationToken}">Click to verify email</a>`,
  };
  await sendEmail(verifyEmail);
  res.json({
    message: "Verify email resend success",
  });
};

const getCurrent = (req, res) => {
  const { email, subscription } = req.user;

  res.json({
    email,
    subscription,
  });
};

const signout = async (req, res) => {
  const { _id } = req.user;

  if (!req.user) {
    throw HttpError(401, "Not authorized");
  }
  await User.findByIdAndUpdate(_id, { token: "" });
  res.status(204).json({
    message: "No Content",
  });
  res.json({
    message: "Logout success",
  });
};

// const refresh = async (req, res) => {
//   const { refreshToken } = req.body;
//   try {
//     const { id } = jwt.verify(refreshToken, JWT_SECRET);
//     const user = await User.findOne({ refreshToken });
//     if (!user) {
//       throw HttpError(403);
//     }
//     const accessToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
//     const refreshToken = jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
//     await User.findByIdAndUpdate(id, { accessToken, refreshToken });

//     res.json({
//       accessToken,
//       refreshToken,
//     });
//   } catch {
//     throw HttpError(403);
//   }
// };

const authControllers = {
  signup: ctrlWrapper(signup),
  verify: ctrlWrapper(verify),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
  signin: ctrlWrapper(signin),
  getCurrent: ctrlWrapper(getCurrent),
  signout: ctrlWrapper(signout),
  // refresh: ctrlWrapper(refresh),
};

export default authControllers;
