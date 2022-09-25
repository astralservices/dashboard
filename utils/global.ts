import { AstroGlobal } from "astro";
import { APIResponse, Integration, Region } from "../types";

export async function GetRegions(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Region[] | null> {
  const data: APIResponse<Region[]> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/regions`,
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

export async function GetIntegrations(
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Integration[] | null> {
  const data: APIResponse<Integration[] | null> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/integrations`,
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

export async function GetIntegration(
  id: string,
  env: Record<string, string>,
  Astro: AstroGlobal
): Promise<Integration | null> {
  const data: APIResponse<Integration | null> = await fetch(
    `${
      env.PROD ? import.meta.env.PUBLIC_API_ENDPOINT : "http://127.0.0.1:3000"
    }/api/v1/integrations/${id}`,
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

export function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(" ");
}
