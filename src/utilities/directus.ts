import { createDirectus, authentication, rest } from "@directus/sdk";

export const client = createDirectus(import.meta.env.VITE_DIRECTUS_URL)
  .with(authentication("json"))
  .with(rest());
