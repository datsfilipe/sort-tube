import "dotenv/config";
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";
 
export const env = createEnv({
  clientPrefix: "PUBLIC_",
  server: {
    OPEN_AI_API_KEY: z.string().min(1),
  },
  client: {},
  runtimeEnv: process.env,
});
