import api from "./api";

export const signUpUser = async ({
  name,
  password,
  email,
  phoneNumber,
}: {
  name: string;
  password: string;
  email: string;
  phoneNumber: string;
}): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.post<{ message?: string }>("/create/user", {
      email,
      name,
      phoneNumber,
      password,
    });

    if (response.status == 400 && response.statusText) {
      return { success: false, message: response.data.message };
    }

    console.log(response);

    return { success: true };
  } catch (error) {
    // console.error("Erro ao Cadastrar", error);
    throw error;
  }
};
