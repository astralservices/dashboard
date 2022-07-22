import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import turbolinks from "@astrojs/turbolinks";
import partytown from "@astrojs/partytown";
// import node from "@astrojs/node";
import deno from "@astrojs/deno";
import { config } from "dotenv";

config();

// https://astro.build/config
export default defineConfig({
  adapter: deno({
    port: 5000,
  }),
  integrations: [react(), tailwind(), turbolinks(), partytown()],
  site:
    process.env.SECRET_NODE_ENV === "production"
      ? "https://dash.astralapp.io"
      : "http://localhost:5000",
});
