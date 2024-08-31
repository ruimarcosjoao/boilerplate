import { z } from "zod";
import api from "./api";

export const GetUrlToUpload = z.object({
  success: z.boolean(),
  message: z.string(),
});

export async function getUrlToUpload(): Promise<z.infer<
  typeof GetUrlToUpload
> | null> {
  try {
    const response = await api.get<z.infer<typeof GetUrlToUpload>>(
      "/user-details"
    );
    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter o url de upload:", error);
    return null;
  }
}
