import { AUTH_REDIRECT_URI, DISCORD_BASE_URL } from "@/constants";
import { z } from "zod";
import { env } from "@/env.mjs";
import axios from "axios";

const SCOPE = "identify email guilds";

const AUTHORIZE_PARAMS = new URLSearchParams({
  client_id: env.DISCORD_CLIENT_ID,
  redirect_uri: AUTH_REDIRECT_URI.toString(),
  response_type: "code",
  scope: SCOPE,
});
const AUTHORIZE_URL = new URL(
  `/api/oauth2/authorize?${AUTHORIZE_PARAMS}`,
  DISCORD_BASE_URL
);
const ACCESS_TOKEN_URL = new URL("/api/oauth2/token", DISCORD_BASE_URL);
const REVOKE_TOKEN_URL = new URL("/api/oauth2/token/revoke", DISCORD_BASE_URL);

export const DiscordOAuth2 = {
  authorizeURL: AUTHORIZE_URL,
  async authenticate(code: string) {
    const response = await axios.post(
      ACCESS_TOKEN_URL.toString(),
      {
        client_id: env.DISCORD_CLIENT_ID,
        client_secret: env.DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: AUTH_REDIRECT_URI,
        scope: SCOPE,
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const data = z
      .object({
        access_token: z.string(),
        refresh_token: z.string(),
        token_type: z.union([z.literal("Bearer"), z.literal("Bot")]),
        expires_in: z.number(),
        scope: z.string(),
      })
      .parse(response.data);

    return data;
  },
};
