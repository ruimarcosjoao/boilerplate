import { env } from "@/env";
import { getAuthToken } from "@/lib/use-secure-store";
import axios from "axios"; // Funções auxiliares para lidar com tokens
import { router } from "expo-router";

// Criação de uma instância do axios com configurações padrão
const api = axios.create({
  baseURL: env.EXPO_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const key = env.EXPO_PUBLIC_AUTH_TOKEN_KEY;

// Interceptando a requisição para adicionar o token de autenticação
api.interceptors.request.use(
  async (config) => {
    const token = await getAuthToken(key); // Obtém o token de autenticação

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    key;
    return Promise.reject(error);
  }
);

// Interceptando a resposta para lidar com erros
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Verifica se o erro é de autenticação (401)
    if (error.response && error.response.status === 401) {
      // Lógica para lidar com a expiração do token ou redirecionamento para login
      console.log("Token expirado ou inválido. Redirecionando para login...");
      // Exemplo: redirecionar para a página de login
      router.push(env.EXPO_PUBLIC_REDIRECT_ERROR);
    }

    return Promise.reject(error);
  }
);

export default api;
