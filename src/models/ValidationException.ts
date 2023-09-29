import { Response } from "express";
import Joi from "joi";
import { IS_PRODUCTION } from "../constants";

export function throwValidationError(
  res: Response,
  errors: Joi.ValidationError
) {
  return res.status(400).json({
    message: errors.message,
    details: errors.details,
    stack: IS_PRODUCTION ? undefined : errors.stack,
  });
}
