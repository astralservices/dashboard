import { AstroGlobal } from "astro";
import {
  DiscordUserInfo,
  APIResponse,
  Provider,
  Workspace,
  WorkspaceMember,
} from "../types";

export async function GetUser(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<DiscordUserInfo | null> {
  const data: APIResponse<DiscordUserInfo> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/auth/session`,
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

export async function GetProviders(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Provider[] | null> {
  const data: APIResponse<Provider[]> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/auth/providers`,
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

export async function GetProvider(
  provider: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Provider | null> {
  const data: APIResponse<Provider> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/auth/providers/${provider}`,
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

export async function GetAllWorkspaces(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Workspace[] | null> {
  const data: APIResponse<WorkspaceMember[]> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/workspaces`,
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

  return data.result.map((workspace) => workspace.workspace as Workspace);
}

export function SetWorkspace(workspace: Workspace): void {
  // window.location.href = `/workspaces/${workspace.id}`;
  localStorage.setItem("workspace", JSON.stringify(workspace));
}

export function GetWorkspace(): Workspace | null {
  const workspace = localStorage.getItem("workspace");
  if (!workspace) {
    return null;
  }
  return JSON.parse(workspace);
}

export enum Actions {
  MODIFY_WORKSPACE_MEMBER = "MODIFY_WORKSPACE_MEMBER",
  DELETE_WORKSPACE_MEMBER = "DELETE_WORKSPACE_MEMBER",
  ADD_WORKSPACE_MEMBER = "ADD_WORKSPACE_MEMBER",

  UPDATE_WORKSPACE = "UPDATE_WORKSPACE",
}

export enum Roles {
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export const PermissionMapping = new Map<Actions, Roles[]>([
  [Actions.MODIFY_WORKSPACE_MEMBER, [Roles.OWNER, Roles.ADMIN]],
  [Actions.DELETE_WORKSPACE_MEMBER, [Roles.OWNER, Roles.ADMIN]],
  [Actions.ADD_WORKSPACE_MEMBER, [Roles.OWNER, Roles.ADMIN]],
  [Actions.UPDATE_WORKSPACE, [Roles.OWNER]],
]);

export function HasPermission(member: WorkspaceMember, action: Actions) {
  if (!PermissionMapping.has(action)) {
    return false;
  }

  const roles = PermissionMapping.get(action);
  if (!roles) {
    return false;
  }

  const memberRole = Roles[member.role.toUpperCase() as keyof typeof Roles];

  return roles.includes(memberRole);
}
