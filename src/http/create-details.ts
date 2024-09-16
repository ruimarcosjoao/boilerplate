import { AddProfileDataSchema } from "@/app/(app)/(drawer)/profile/add";
import { z } from "zod";
import api from "./api";

type UpdateProps = z.infer<typeof AddProfileDataSchema>;
export const createUserDetails = async (
  data: UpdateProps
): Promise<{ success: boolean; message?: string }> => {
  try {
    const response = await api.post<{ message?: string }>(
      "/create/user-details",
      {
        ...data,
      }
    );

    if (response.status == 400 && response.statusText) {
      return { success: false, message: response.data.message };
    }

    return { success: true };
  } catch (error) {
    throw error;
  }
};
