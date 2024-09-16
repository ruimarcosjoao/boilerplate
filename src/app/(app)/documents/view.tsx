import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
export default function VizualiseDoc() {
  const transformed = useLocalSearchParams();

  return (
    <View className="flex-1 p-6 bg-background">
      <Text className="text-3xl font-bold">Documento de Identidade</Text>
      <View className="mt-4 flex-row flex-wrap gap-4">
        {Object.keys(transformed).map((key, index) => (
          <View key={index} className="mt-2">
            <Text className="font-bold">{key}:</Text>
            <Text>{transformed[key]}</Text>
          </View>
        ))}
      </View>
      <Button className="mt-6">
        <Text>Usar dados</Text>
      </Button>
    </View>
  );
}
