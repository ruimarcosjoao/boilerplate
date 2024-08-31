import { useHeaderTitle } from "@/store/use-header-name";
import { useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Text, View } from "react-native";
export default function TagsSearch() {
  const { tag } = useLocalSearchParams<{ tag: string }>();
  const { setHeaderTitle } = useHeaderTitle();

  useLayoutEffect(() => {
    setHeaderTitle(tag as string);
  }, [tag]);

  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-3xl font-bold">
        {tag ? tag : "pesquisa por tag"}
      </Text>
    </View>
  );
}
