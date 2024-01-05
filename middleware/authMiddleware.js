import {
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
} from "../errors/customErrors.js";
import { verifyJWT } from "../utils/tokenUtils.js";

export const authenticateUser = (req, res, next) => {
  const { token } = req.cookies;

  if (!token) throw new UnauthenticatedError("No Token/authentication invalid");
  try {
    const { userId, role } = verifyJWT(token);
    const isTestUser = userId === "658e7a7bc46eb4fd3bd0f40d";
    req.user = { userId, role, isTestUser };
    next();
  } catch (e) {
    throw new UnauthenticatedError("authentication invalid");
  }
};

export const authorizePermissions = (role) => {
  return (req, res, next) => {
    if (req.user.role !== role)
      throw new UnauthorizedError("Unauthorized to access this route");
    next();
  };
};

export const checkTestUser = (req, res, next) => {
  if (req.user.isTestUser) throw new BadRequestError("Bad request, Read only");
  next();
};
