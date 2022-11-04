import { AstroGlobal } from "astro";
import { Workspace, BotAnalytics, APIResponse, Bot } from "../types";

export async function GetBotForWorkspace(
  workspace: Workspace,
  env: Record<string, string>,
  Astro: Readonly<AstroGlobal<Record<string, any>>>
): Promise<Bot | null> {
  const data: APIResponse<Bot | null> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${workspace.id}/bot`,
    {
      headers: Astro.request.headers,
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  if (data.error) {
    console.error(data.error);
    return null;
  }

  return data.result;
}
