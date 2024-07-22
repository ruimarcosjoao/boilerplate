import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { router } from "expo-router";
import React from "react";
import { View } from "react-native";
export default function Blue() {
  return (
    <View className="flex-1 justify-center items-center">
      <Text>Blue</Text>
      <Button onPress={() => router.back()}>
        <Text>Go Back</Text>
      </Button>
    </View>
  );
}
