// authService.js

import { env } from "@/env";
import { Profile, setAuthToken } from "@/lib/use-secure-store";
import api from "./api"; // Supondo que você tenha configurado o Axios no arquivo api.js

// Função para realizar o sign in
export const signInUser = async (
  username: string,
  password: string
): Promise<{ token: string } & Profile> => {
  try {
    // Faz a requisição POST para a rota de login da API
    const response = await api.post("/auth/sign-in", {
      email: username,
      password,
    });

    if (response.status == 400 && response.statusText) {
      console.log("404 error");
    }

    // Extrai o token da resposta
    const { token } = response.data;

    // Armazena o token no AsyncStorage
    await setAuthToken(env.EXPO_PUBLIC_AUTH_TOKEN_KEY, token);

    // (Opcional) Armazena o refresh token se sua API retornar
    // const { refreshToken } = response.data;
    // if (refreshToken) {
    //   await Se("refreshToken", refreshToken);
    // }

    return response.data;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};
