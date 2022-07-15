import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import turbolinks from "@astrojs/turbolinks";
import partytown from "@astrojs/partytown";
// import node from "@astrojs/node";
import deno from "@astrojs/deno";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  adapter: deno({
    port: 5000,
  }),
  integrations: [react(), tailwind(), turbolinks(), partytown()],
});
