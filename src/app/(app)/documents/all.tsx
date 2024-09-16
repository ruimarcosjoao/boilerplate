import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H3, H4 } from "@/components/ui/typography";
import api from "@/http/api";
import {
  ChevronRight,
  LucideFolderArchive,
  RefreshCcw,
} from "@/lib/icons/icons";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import React from "react";
import { Pressable, TouchableOpacity, View } from "react-native";

interface Document {
  id: string;
  documentType: string;
  number: string;
  fileUrl: string;
  issueDate: Date;
  expiryDate: Date;
  status: string;
}

interface DocumentsResponse {
  documents: Document[];
  meta: {
    total: number;
    page: number;
    limit: number;
  };
}

export default function AllDocuments() {
  const {
    data: documentsData,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["all-documents"],
    queryFn: async () => {
      const response = (await api.get<DocumentsResponse>("/users/documents"))
        .data;
      return response;
    },
  });
  const documents = [
    {
      id: 1,
      titulo: "Bilhete de Identidade",
      numero: "005688121LA041",
    },
    {
      id: 2,
      titulo: "Passaporte",
      numero: "005688121LA041",
    },
    {
      id: 3,
      titulo: "Atestado Medico",
      numero: "005688121LA041",
    },
  ];
  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center p-6">
        <Text>Carregando...</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-background">
      <View className="bg-input h-20 -mt-2 px-6 pt-7 pb-4">
        <View className="flex-row items-center justify-between">
          <H3>Carteira Digital</H3>
          <TouchableOpacity activeOpacity={0.7} onPress={() => refetch}>
            <RefreshCcw className="text-foreground" />
          </TouchableOpacity>
        </View>
      </View>
      <Text>{JSON.stringify(documentsData, null, 2)}</Text>
      <View className="flex-1 p-6 gap-4">
        {documentsData?.documents.map((document) => {
          return (
            <Link
              href={`/(app)/documents/${document.id}?type=${document.titulo}`}
              asChild
              key={`${document.id}-${document.titulo.split(" ").join("-")}`}
            >
              <Pressable>
                <Card className="bg-input p-0">
                  <CardContent className="p-4 flex-row items-center justify-between">
                    <View className="flex-row items-center gap-4">
                      <LucideFolderArchive className="text-primary" size={35} />
                      <View className="">
                        <H4 className="">{document.titulo}</H4>
                        <Text className="text-sm">{document.numero}</Text>
                      </View>
                    </View>
                    <ChevronRight className="text-foreground" />
                  </CardContent>
                </Card>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </View>
  );
}
