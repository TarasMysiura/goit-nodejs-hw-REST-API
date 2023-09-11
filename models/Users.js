import { Schema, model } from "mongoose";
import { handleSaveError, runValidateAtUpdate } from "./hooks.js";
import { validatePhoneRegex } from "../schemas/contacts-schemas.js";

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ["starter", "pro", "business"],
      default: "starter",
    },
    token: String,
  },
  { versionKey: false, timestamps: true }
);

// userSchema.post("save", handleSaveError);

// userSchema.pre("findOneAndUpdate", runValidateAtUpdate);

// userSchema.post("findOneAndUpdate", handleSaveError);

const User = model("user", userSchema);

export default User;
