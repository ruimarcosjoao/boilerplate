import { Button } from "@/components/ui/button";
import { getUploadUrl, MimeType } from "@/http/get-upload-url";
import { extractUrlAndHeaders } from "@/utils/extrate-url-headers";
import { truncateString } from "@/utils/truncate-string";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import { FileUp, Pencil, Upload } from "lucide-react-native";
import React, { useState } from "react";
import { Text, View } from "react-native";

interface Document {
  uri: string;
  name: string;
  mimeType: MimeType;
}

const AddDocument = () => {
  const [document, setDocument] = useState<Document | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [fileObjectName, setFileObjectName] = useState<string | null>(null);

  const {
    mutate: fetchUploadUrl,
    isError,
    isPending,
  } = useMutation({
    mutationKey: ["url-to-upload"],
    mutationFn: async (mimeType: MimeType) => {
      const response = await getUploadUrl(mimeType);
      return response;
    },
    onSuccess(data, variables, context) {
      setUploadUrl(data.presignedUrl);
      setFileObjectName(data.objectName);
    },
  });

  const {
    mutate: uploadFile,
    isError: isErrorInUpload,
    isPending: isPendingUpload,
  } = useMutation({
    mutationKey: ["upload-file"],
    mutationFn: async () => {
      if (!uploadUrl || !document) return;

      const refinedUrl = extractUrlAndHeaders(uploadUrl);
      const response = await axios.put(`${refinedUrl.url}`, formData, {});
      console.log(response.data);
    },
  });

  const handleDocumentSelect = async () => {
    const document = await DocumentPicker.getDocumentAsync({
      type: [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officed",
      ],
    });
    if (!document.canceled) {
      setDocument({
        uri: document.assets[0].uri,
        name: document.assets[0].name,
        mimeType: document.assets[0].mimeType as MimeType,
      });
      fetchUploadUrl(document.assets[0].mimeType as MimeType);
    }
  };

  return (
    <View className="flex-1 p-6 bg-background gap-4">
      <Text className="text-2xl font-bold">Adicionar um documento</Text>
      <View className="flex-row items-center gap-2">
        <View className="bg-input rounded-md flex-1 px-4 py-2.5">
          <Text>
            {document
              ? truncateString(document.name, 30)
              : "adicionar documento"}
          </Text>
        </View>
        <Button
          onPress={handleDocumentSelect}
          disabled={isPending}
          className="bg-input"
          size={"icon"}
        >
          {document ? (
            <Pencil size={18} color={"#000"} />
          ) : (
            <FileUp size={18} color={"#000"} />
          )}
        </Button>
        <Button
          onPress={() => uploadFile()}
          disabled={isPendingUpload}
          className="bg-green-500"
          size={"icon"}
        >
          <Upload size={18} color={"#000"} />
        </Button>
      </View>
    </View>
  );
};
export default AddDocument;
