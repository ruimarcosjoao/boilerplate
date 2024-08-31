import { userProfileResponse } from "@/@types/profile";
import { z } from "zod";
import api from "./api";

export async function getProfile(): Promise<z.infer<
  typeof userProfileResponse
> | null> {
  try {
    const response = await api.get<z.infer<typeof userProfileResponse>>(
      "/profile"
    );
    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter o perfil:", error);
    return null;
  }
}
