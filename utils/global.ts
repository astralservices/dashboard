import { AstroGlobal } from "astro";
import { APIResponse, Integration, Region } from "../types";

export async function GetRegions(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Region[] | null> {
  const data: APIResponse<Region[]> = await fetch(
    `${
      env.SECRET_NODE_ENV === "production"
        ? import.meta.env.PUBLIC_API_ENDPOINT
        : "http://127.0.0.1:3000"
    }/api/v1/regions`,
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

export async function GetIntegrations(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Integration[] | null> {
  const data: APIResponse<Integration[] | null> = await fetch(
    `${
      env.SECRET_NODE_ENV === "production"
        ? import.meta.env.PUBLIC_API_ENDPOINT
        : "http://127.0.0.1:3000"
    }/api/v1/integrations`,
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

export async function GetIntegration(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Integration | null> {
  const data: APIResponse<Integration | null> = await fetch(
    `${
      env.SECRET_NODE_ENV === "production"
        ? import.meta.env.PUBLIC_API_ENDPOINT
        : "http://127.0.0.1:3000"
    }/api/v1/integrations/${id}`,
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

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
