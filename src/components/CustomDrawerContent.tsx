import { Power } from "@/lib/icons/icons";
import { useSession } from "@/providers/auth";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Image, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ThemeToggle } from "./ThemeToggle";
import { Text } from "./ui/text";

export function CustomDrawerContent(props: any) {
  const { signOut } = useSession();
  const { bottom } = useSafeAreaInsets();
  return (
    <View className={`flex-1 pb-[${bottom + 50}]`}>
      <View className="px-4 py-8 gap-1 items-center justify-center bg-primary">
        <Image
          source={require("@/assets/images/logo.png")}
          resizeMode="contain"
          className="w-20 h-16"
        />
        <Text className="text-white">Carteira de Identificação Digital</Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View
        className={`p-6 flex-row items-center justify-between gap-2 pb-[${
          bottom + 20
        }]`}
      >
        <View className="flex-row items-center gap-1">
          <ThemeToggle />
          <Text className="">Tema</Text>
        </View>
        <Pressable
          onPress={() => signOut()}
          className="flex-row items-center gap-1"
        >
          <Power size={20} className="text-red-500" />
          <Text>Sair</Text>
        </Pressable>
      </View>
    </View>
  );
}
