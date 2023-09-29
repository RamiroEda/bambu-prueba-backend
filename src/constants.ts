/**
 * Este archivo contiene las constantes de la aplicación.
 */

require("dotenv").config();

export const SMTP_EMAIL = process.env.SMTP_EMAIL;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_HOST = process.env.SMTP_HOST;
export const SMTP_PORT = process.env.SMTP_PORT;

export const JWT_SECRET = process.env.JWT_SECRET ?? "changeme";
export const PORT = Number(process.env.PORT) ?? 3000;

export const IS_PRODUCTION = process.env.NODE_ENV === "production";
