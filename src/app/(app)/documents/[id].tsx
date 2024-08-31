import { Text } from "@/components/ui/text";
import { Download, Share2, Star } from "@/lib/icons/icons";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
export default function DocumentById() {
  const { id, type } = useLocalSearchParams<{ id: string; type: string }>();
  return (
    <View className="flex-1 p-6 bg-background">
      <View className="-mt-6 py-4 flex-row items-center justify-between px-6">
        <Pressable className="items-center justify-center">
          <Star className="text-primary" size={18} />
          <Text className="text-sm">Favoritar</Text>
        </Pressable>
        <Pressable className="items-center justify-center">
          <Download className="text-primary" size={18} />
          <Text className="text-sm">Baixar</Text>
        </Pressable>
        <Pressable className="items-center justify-center">
          <Share2 className="text-primary" size={18} />
          <Text className="text-sm">Partilhar</Text>
        </Pressable>
      </View>
      <Text className="text-3xl font-bold">
        DocumentById {id} tipo: {type}
      </Text>
    </View>
  );
}
