import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { H4 } from "@/components/ui/typography";
import React from "react";
import { View } from "react-native";
export default function Index() {
  const [checked, setChecked] = React.useState(false);

  return (
    <View className="flex-1 p-6 bg-background gap-4">
      <Text className="text-3xl font-bold">Configurações</Text>
      <View className="bg-input p-4 rounded-md flex-row items-center justify-between">
        <H4>Lorem Ipslum</H4>
        <Switch
          checked={checked}
          className=""
          onCheckedChange={setChecked}
          nativeID="airplane-mode"
        />
      </View>
    </View>
  );
}
