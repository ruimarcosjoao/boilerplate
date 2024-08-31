import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H3, H4 } from "@/components/ui/typography";
import {
  ChevronRight,
  LucideFolderArchive,
  RefreshCcw,
} from "@/lib/icons/icons";
import { Link } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
export default function AllDocuments() {
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
  return (
    <View className="flex-1 bg-background">
      <View className="bg-input h-20 -mt-2 px-6 pt-7 pb-4">
        <View className="flex-row items-center justify-between">
          <H3>Carteira Digital</H3>
          <Pressable>
            <RefreshCcw className="text-foreground" />
          </Pressable>
        </View>
      </View>
      <View className="flex-1 p-6 gap-4">
        {documents.map((document) => {
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
