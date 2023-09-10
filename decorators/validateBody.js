import { HttpError } from "../helpers/index.js";

const validateBody = (schema) => {
  const func = (req, res, next) => {
    if (!req.body.name && !req.body.email && !req.body.phone) {
      return next(HttpError(400, "missing fields"));
    }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

const validateBodyFavorite = (schema) => {
  const func = (req, res, next) => {
    // console.log('req: ', typeof req.body[favorite]);
    // // console.log('length(req.body): ',length(req.body));

    // if (typeof req.body[favorite] === "undefined") {
    //   return next(HttpError(400, "missing field favorite"));
    // }

    const { error } = schema.validate(req.body);
    if (error) {
      return next(HttpError(400, error.message));
    }
    next();
  };

  return func;
};

export default { validateBody, validateBodyFavorite };
