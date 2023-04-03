import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { request, setGlobalDispatcher, Agent } from "undici";

export default async function Guilds() {
  const access_token = cookies().get("access_token");
  cookies().getAll().forEach(console.log);

  if (!access_token) {
    return redirect("/");
  }

  try {
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${access_token.value}`,
      },
    });
    const guilds = await response.json();

    return <div>{JSON.stringify(guilds)}</div>;
  } catch (error) {
    console.log(error);
    return <div>{JSON.stringify(error)}</div>;
  }
}
