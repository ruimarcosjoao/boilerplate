// auth.js
import * as SecureStore from "expo-secure-store";

export interface Profile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phoneNumber: string;
}

export const getAuthToken = async (key: string): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync(key);
  } catch (error) {
    console.error("Erro ao obter o token:", error);
    return null;
  }
};

export const setAuthToken = async (
  key: string,
  token: string
): Promise<void> => {
  try {
    await SecureStore.setItemAsync(key, token);
  } catch (error) {
    console.error("Erro ao salvar o token:", error);
  }
};

export const removeAuthToken = async (key: string): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch (error) {
    console.error("Erro ao remover o token:", error);
  }
};

export const getRefreshToken = async (): Promise<string | null> => {
  try {
    return await SecureStore.getItemAsync("refreshToken");
  } catch (error) {
    console.error("Erro ao obter o refresh token:", error);
    return null;
  }
};

export const setProfile = async (profile: Profile): Promise<void> => {
  try {
    await SecureStore.setItemAsync("profile", JSON.stringify(profile));
  } catch (error) {
    console.error("Erro ao salvar o perfil:", error);
  }
};

export const removeProfile = async (): Promise<void> => {
  try {
    await SecureStore.deleteItemAsync("profile");
  } catch (error) {
    console.error("Erro ao remover o perfil:", error);
  }
};

export const getProfileStore = async (): Promise<Profile | null> => {
  try {
    const data = await SecureStore.getItemAsync("profile");
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter os dados do perfil:", error);
    return null;
  }
};

export const resetStore = async (newProfile: Profile): Promise<void> => {
  try {
    await removeProfile();
    await setProfile(newProfile); // Guarda o novo perfil
  } catch (error) {
    console.error("Erro ao resetar o store:", error);
  }
};
