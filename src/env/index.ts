import { z } from "zod";

const envSchema = z.object({
  EXPO_PUBLIC_AUTH_TOKEN_KEY: z.string(),
  EXPO_PUBLIC_API_BASE_URL: z.string().url(),
  EXPO_PUBLIC_REDIRECT_SUCCESS: z.string(),
  EXPO_PUBLIC_REDIRECT_ERROR: z.string(),
});

export const env = envSchema.parse(process.env);
