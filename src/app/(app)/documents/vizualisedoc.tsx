import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
export default function VizualiseDoc() {
  const transformed = useLocalSearchParams();
  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-3xl font-bold">VizualiseDoc</Text>
      <View className="flex-1 items-center justify-center p-4 bg-white">
        <Text className="text-3xl font-bold">VizualiseDoc</Text>
        <View className="mt-4">
          <Text className="font-bold text-lg">
            Dados do Bilhete de Identidade
          </Text>
          <View className="mt-2">
            <Text className="font-bold">Nome Completo:</Text>
            <Text>{transformed.nome}</Text>
          </View>
          <View className="mt-2">
            <Text className="font-bold">Filiação:</Text>
            <Text>{transformed.filiacao}</Text>
          </View>
          <View className="mt-2">
            <Text className="font-bold">Bilhete de Identidade Nº:</Text>
            <Text>{transformed.bilheteIdentidade}</Text>
          </View>
          <View className="mt-2">
            <Text className="font-bold">Tipo de Documento:</Text>
            <Text>{transformed.tipoDocumento}</Text>
          </View>
          {/* Adicione mais campos aqui se necessário */}
        </View>
      </View>
    </View>
  );
}
