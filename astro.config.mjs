import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import turbolinks from "@astrojs/turbolinks";
import partytown from "@astrojs/partytown";
// import node from "@astrojs/node";
import deno from "@astrojs/deno";

// https://astro.build/config
export default defineConfig({
  adapter: deno({
    port: 5000,
  }),
  integrations: [react(), tailwind(), turbolinks(), partytown()],
});
