import api from "./api";

export async function getAllDocuments(): Promise<any | null> {
  try {
    const response = await api.get<any>("/users/documents");
    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao obter o perfil:", error);
    return null;
  }
}
