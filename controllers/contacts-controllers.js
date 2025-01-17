import fs from "fs/promises";
import path from "path";
import Jimp from "jimp";
import gravatar from "gravatar";

import { Contact } from "../models/index.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const avatarsPath = path.resolve("public", "avatars");
const newPath = (filename) => {
  return path.join(avatarsPath, filename);
};

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;

  const skip = (page - 1) * limit;
  const result = await Contact.find({ owner }, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner");
  let favoriteContacts = result;
  if (favorite !== undefined) {
    favoriteContacts = result.filter((e) => {
      return e.favorite == true;
    });
  }

  res.json(favoriteContacts);
};

const getByID = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id, owner });

  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const add = async (req, res) => {
  const { _id: owner, email } = req.user;
  const { path: oldPath, filename } = req.file;
  console.log("req.file: ", req.file);

  const file = await Jimp.read(oldPath);
  file.resize(250, 250).write(oldPath);
  const avatarImagePath = newPath(filename);
  const fileNameImage = filename;

  await fs.rename(oldPath, newPath(filename));
  const avatarURL = gravatar.url(email, {}, true);

  const result = await Contact.create({
    ...req.body,
    avatarURL,
    avatarImagePath,
    owner,
  });
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;

  const result = await Contact.findOneAndUpdate({ _id: id, owner }, req.body, {
    new: true,
  });

  if (!result) {
    throw HttpError(404, `Contacts with id=${id} not found`);
  }

  res.json(result);
};

const updateByIdAvatar = async (req, res) => {
  const { _id } = req.user;
  const { id } = req.params;
  const user = await Contact.findOne({ _id: id });
  const { path: oldPath } = req.file;

  const file = await Jimp.read(oldPath);
  file.resize(250, 250).write(oldPath);

  const { path: tempUpload, originalname } = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsPath, filename);
  const avatarImagePath = resultUpload;

  await fs.rename(tempUpload, resultUpload);
  await fs.unlink(user.avatarImagePath);
  const avatarURL = gravatar.url(user.email, {}, true);

  await Contact.findOneAndUpdate({ _id: id }, { avatarURL, avatarImagePath });

  res.json({ avatarURL, avatarImagePath });
};

const deleteById = async (req, res) => {
  const { _id: owner } = req.user;
  const { id } = req.params;
  const result = await Contact.findOneAndRemove({ _id: id, owner });
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

const contactsControllers = {
  getAll: ctrlWrapper(getAll),
  getByID: ctrlWrapper(getByID),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  updateByIdAvatar: ctrlWrapper(updateByIdAvatar),
  deleteById: ctrlWrapper(deleteById),
};

export default contactsControllers;
