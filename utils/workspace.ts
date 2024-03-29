import { AstroGlobal } from "astro";
import {
  APIResponse,
  BotAnalytics,
  DiscordUserInfo,
  Integration,
  Plan,
  Workspace,
  WorkspaceIntegration,
  WorkspaceMember,
  WorkspacePlan,
} from "../types";
import { GetUser } from "./user";

export async function GetPlans(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Plan[]> {
  const data: APIResponse<Plan[]> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/plans`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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

export async function GetWorkspace(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Workspace> {
  const data: APIResponse<Workspace> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${id}`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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

export async function GetWorkspaceMemberCount(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<number> {
  const data: APIResponse<number> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${id}/members?count=true`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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

export async function GetSelfWorkspaceMember(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<WorkspaceMember> {
  const user = await GetUser(env, Astro);
  const data: APIResponse<WorkspaceMember> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${id}/members/${user.id}`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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

export async function GetWorkspaceMembers(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<WorkspaceMember[]> {
  const data: APIResponse<WorkspaceMember[]> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${id}/members`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
    }
  )
    .then((res) => res.json())
    .catch((err) => console.error(err));

  if (data.error) {
    console.error(data.error);
    return null;
  }

  // sort by role, owner first, admin second, member third

  return data.result.sort((a, b) => {
    if (a.role === "owner") return -1;
    if (b.role === "owner") return 1;
    if (a.role === "admin") return -1;
    if (b.role === "admin") return 1;
    return 0;
  });
}

export async function GetAnalytics(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<BotAnalytics[] | null> {
  const data: APIResponse<BotAnalytics[] | null> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${id}/analytics`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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

export async function GetWorkspaceIntegrations(
  workspace: Workspace,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<WorkspaceIntegration[] | null> {
  const data: APIResponse<WorkspaceIntegration[] | null> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${workspace.id}/integrations`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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

export async function GetWorkspaceIntegration(
  workspace: Workspace,
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<WorkspaceIntegration | null> {
  const data: APIResponse<WorkspaceIntegration | null> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces/${workspace.id}/integrations/${id}`,
    {
      headers: {
        cookie: Astro.request.headers.get("cookie"),
      },
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
