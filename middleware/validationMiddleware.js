import mongoose from "mongoose";
import { body, param, validationResult } from "express-validator";

import {
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { JOB_STATUS, JOB_TYPE } from "../utils/constants.js";
import Job from "../models/jobModels.js";
import User from "../models/UserModel.js";

const withValidationError = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);

        if (errorMessages[0].startsWith("no job")) {
          throw new NotFoundError(errorMessages);
        }
        if (errorMessages[0].startsWith("Not authorized")) {
          throw new UnauthorizedError(errorMessages);
        }
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateJobInput = withValidationError([
  body("company").notEmpty().withMessage("Company is required"),
  body("position").notEmpty().withMessage("Position is required"),
  body("jobLocation").notEmpty().withMessage("job location is required"),
  body("jobStatus")
    .notEmpty()
    .withMessage("job status is required")
    .isIn(Object.values(JOB_STATUS))
    .withMessage("Invalid Status value"),
  body("jobType")
    .notEmpty()
    .withMessage("job type is required")
    .isIn(Object.values(JOB_TYPE))
    .withMessage("Invalid Type value"),
]);

export const validateIdParameter = withValidationError([
  param("id").custom(async (value, { req }) => {
    const isValidId = mongoose.Types.ObjectId.isValid(value);
    if (!isValidId) throw new Error("Invalid mongoDb ID parameter");
    const jobItem = await Job.findById(value);
    if (!jobItem) throw new Error(`No Job Found with Id ${value}`);
    const isAdmin = req.user.role === "admin";
    const isOwner = req.user.userId === jobItem.createdBy.toString();
    if (!isAdmin && !isOwner) throw new Error(`Not authorized to access this`);
  }),
]);

export const validateRegisterInput = withValidationError([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) throw new Error("Email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
]);

export const validateLoginInput = withValidationError([
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("password is required"),
]);

export const validateUpdateUserInput = withValidationError([
  body("name").notEmpty().withMessage("Name is required"),
  body("email")
    .notEmpty()
    .withMessage("email is required")
    .isEmail()
    .withMessage("Please enter a valid email address")
    .custom(async (email, { req }) => {
      const user = await User.findOne({ email });
      if (user && user._id.toString() !== req.user.userId)
        throw new Error("Email already exists");
    }),

  body("location").notEmpty().withMessage("location is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
]);
