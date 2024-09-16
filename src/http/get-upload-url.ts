import { z } from "zod";
import api from "./api";

interface GenerateUploadUrlResponse {
  presignedUrl: string;
  objectName: string;
}

const generateUploadUrlSchema = z.object({
  presignedUrl: z.string(),
  objectName: z.string(),
});

export type MimeType =
  | "image/jpeg"
  | "image/png"
  | "application/pdf"
  | undefined;

export async function getUploadUrl(
  mimeType: MimeType
): Promise<z.infer<typeof generateUploadUrlSchema> | null> {
  try {
    const response = await api.get<z.infer<typeof generateUploadUrlSchema>>(
      `/users/upload/generate-upload-url?mimeType=${mimeType}`
    );
    if (response) {
      return response.data;
    }
    return null;
  } catch (error) {
    console.error("Erro ao gerar URL de upload:", error);
    return null;
  }
}
