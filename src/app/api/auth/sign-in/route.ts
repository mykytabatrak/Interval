import { DiscordOAuth2 } from "@/services/DiscordOAuth2";

export async function POST() {
  return Response.redirect(DiscordOAuth2.authorizeURL);
}
