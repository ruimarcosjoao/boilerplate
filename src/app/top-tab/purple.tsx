import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { H4, P } from "@/components/ui/typography";
import React, { useState } from "react";
import { View } from "react-native";

const SettingsScreen = () => {
  const [airplaneMode, setAirplaneMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <View className="flex-1 p-6 gap-4 bg-backround">
      <View className="bg-secondary py-6 px-4 rounded-xl w-full flex-row gap-4 items-center justify-between">
        <View className="flex-1">
          <H4>Settings one</H4>
          <P className="text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </P>
        </View>
        <View className="flex-row items-center gap-2">
          <Switch
            checked={airplaneMode}
            onCheckedChange={setAirplaneMode}
            nativeID="airplane-mode"
          />
        </View>
      </View>
      <View className="bg-secondary py-6 px-4 rounded-xl w-full flex-col gap-4 items-center justify-between">
        <View className="w-full flex-row gap-4 items-center justify-between">
          <View className="flex-1">
            <H4>Settings one</H4>
          </View>
          <View className="flex-row items-center gap-2">
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              nativeID="airplane-mode"
            />
          </View>
        </View>
        <Separator />
        <View className="w-full flex-row gap-4 items-center justify-between">
          <View className="flex-1">
            <H4>Settings one</H4>
          </View>
          <View className="flex-row items-center gap-2">
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              nativeID="airplane-mode"
            />
          </View>
        </View>
        <Separator />

        <View className="w-full flex-row gap-4 items-center justify-between">
          <View className="flex-1">
            <H4>Settings one</H4>
          </View>
          <View className="flex-row items-center gap-2">
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              nativeID="airplane-mode"
            />
          </View>
        </View>
        <Separator />

        <View className="w-full flex-row gap-4 items-center justify-between">
          <View className="flex-1">
            <H4>Settings one</H4>
          </View>
          <View className="flex-row items-center gap-2">
            <Switch
              checked={airplaneMode}
              onCheckedChange={setAirplaneMode}
              nativeID="airplane-mode"
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default SettingsScreen;
