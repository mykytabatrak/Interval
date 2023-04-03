import { DiscordOAuth2 } from "@/services/DiscordOAuth2";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);

  const response = NextResponse.redirect(url.origin);

  try {
    const code = z.string().parse(url.searchParams.get("code"));
    const data = await DiscordOAuth2.authenticate(code);

    response.cookies.set({
      name: "access_token",
      value: data.access_token,
      httpOnly: true,
    });
    response.cookies.set({
      name: "refresh_token",
      value: data.refresh_token,
      httpOnly: true,
    });
    response.cookies.set({
      name: "token_type",
      value: data.token_type,
      httpOnly: true,
    });
    response.cookies.set({
      name: "expires_in",
      value: data.expires_in.toString(),
      httpOnly: true,
    });
    response.cookies.set({
      name: "scope",
      value: data.scope,
      httpOnly: true,
    });

    return response;
  } finally {
    return response;
  }
}
