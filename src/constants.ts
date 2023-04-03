import { env } from "./env.mjs";

export const DISCORD_BASE_URL = "https://discord.com/";
export const AUTH_REDIRECT_URI = new URL(
  "/api/auth/callbacks/sign-in",
  env.AUTH_URL
);
