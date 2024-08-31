import { Button } from "@/components/ui/button";
import * as DocumentPicker from "expo-document-picker";
import React from "react";
import { Text, View } from "react-native";

export default function Add() {
  // const {
  //   data: uploadUrl,
  //   isError,
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["url-to-upload"],
  //   queryFn: async () => {
  //     const response = await getUrlToUpload();
  //     return response;
  //   },
  // });

  // console.log(uploadUrl);

  return (
    <View className="flex-1 p-6 bg-background gap-4">
      <Text className="text-2xl font-bold">Adicionar um documento</Text>
      <Button onPress={async () => await DocumentPicker.getDocumentAsync()}>
        <Text>adicionar documento</Text>
      </Button>
    </View>
  );
}
