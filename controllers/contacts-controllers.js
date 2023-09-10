import { Contact } from "../models/index.js";

import { HttpError } from "../helpers/index.js";

import { ctrlWrapper } from "../decorators/index.js";

const getAll = async (req, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getByID = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(result);
};

const add = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, `Contacts with id=${id} not found`);
  }

  res.json(result);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }
  res.json({
    message: "Delete success",
  });
};

export default {
  getAll: ctrlWrapper(getAll),
  getByID: ctrlWrapper(getByID),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
