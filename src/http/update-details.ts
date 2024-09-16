import { AddProfileDataSchema } from "@/app/(app)/(drawer)/profile/add";
import { z } from "zod";
import api from "./api";

type UpdateProps = z.infer<typeof AddProfileDataSchema>;
export const updateUserDetails = async (
  data: UpdateProps
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.put<{ message?: string }>("/user-details", {
      ...data,
    });

    if (response.status == 400 && response.statusText) {
      return { success: false, message: response.data.message };
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};
