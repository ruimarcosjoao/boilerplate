import { Text } from "@/components/ui/text";
import { H3 } from "@/components/ui/typography";
import { useSession } from "@/providers/auth";
import { useHeaderTitle } from "@/store/use-header-name";
import { Redirect, router, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowLeft } from "lucide-react-native";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function Layout() {
  const { headerTitle } = useHeaderTitle();
  const { session, isLoading } = useSession();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!session) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0E0A68" style="light" />
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          initialRouteName="(drawer)"
          screenOptions={{
            header(props) {
              return (
                <View className="bg-primary p-6 flex-row h-24 rounded-b-xl items-center justify-between">
                  <View className="flex-row items-center gap-4">
                    <Pressable onPress={() => router.back()}>
                      <ArrowLeft color={"#fff"} />
                    </Pressable>
                    <H3 className="text-white">{props.options.title}</H3>
                  </View>
                </View>
              );
            },
          }}
        >
          <Stack.Screen
            name="(drawer)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="search"
            options={{
              title: `${headerTitle ? headerTitle : "Pesquisa de documentos"}`,
            }}
          />
          <Stack.Screen
            name="services"
            options={{
              title: `${headerTitle ? headerTitle : "Serviço Público"}`,
            }}
          />
          <Stack.Screen
            name="documents"
            options={{
              title: "Meus documentos",
            }}
          />
        </Stack>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
