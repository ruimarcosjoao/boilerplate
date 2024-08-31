import { CustomDrawerContent } from "@/components/CustomDrawerContent";
import { Skeleton } from "@/components/ui/skeleton";
import { H4, Small } from "@/components/ui/typography";
import { Folder } from "@/lib/icons/Folder";
import { Menu } from "@/lib/icons/Menu";
import { Settings } from "@/lib/icons/Setting";
import { User } from "@/lib/icons/User";
import { getProfileStore } from "@/lib/use-secure-store";
import { DrawerActions } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { Drawer } from "expo-router/drawer";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
export default function Layout() {
  const navegation = useNavigation();

  const {
    data: profile,
    error,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ["profile-parse"],
    queryFn: async () => {
      const profileData = await getProfileStore();
      return profileData;
    },
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#0E0A68" />
      <Drawer
        drawerContent={CustomDrawerContent}
        screenOptions={{
          drawerActiveTintColor: "#0E0A68",
          drawerIcon(props) {
            return <Menu className={"text-white"} />;
          },
          drawerPosition: "right",
          header(props) {
            return (
              <View className="h-40 flex-row items-center justify-between bg-primary w-full rounded-b-[28] py-6 px-8">
                <View className="flex-row items-center gap-4">
                  <Image
                    source={
                      profile?.avatar
                        ? {
                            uri: profile?.avatar,
                          }
                        : require("@/assets/images/icon.png")
                    }
                    resizeMode="contain"
                    className="h-16 w-16 rounded-full border border-white"
                  />
                  <View>
                    {isLoading ? (
                      <Skeleton className={"w-full h-3 "} />
                    ) : (
                      <H4 className="text-white">{profile?.name}</H4>
                    )}

                    {isLoading ? (
                      <Skeleton className={"w-full h-3 "} />
                    ) : (
                      <Small className="text-white/65">{profile?.email}</Small>
                    )}
                  </View>
                </View>
                <Pressable
                  onPress={() =>
                    navegation.dispatch(DrawerActions.openDrawer())
                  }
                >
                  <Menu className="text-white size-6" size={30} />
                </Pressable>
              </View>
            );
          },
        }}
      >
        <Drawer.Screen
          name="index"
          options={{
            title: "Home",
            drawerIcon(props) {
              return (
                <Folder
                  className={props.focused ? "text-primary" : "text-foreground"}
                />
              );
            },
          }}
        />
        <Drawer.Screen
          name="profile/index"
          options={{
            title: "Perfil",
            drawerIcon(props) {
              return (
                <User
                  className={props.focused ? "text-primary" : "text-foreground"}
                />
              );
            },
          }}
        />

        <Drawer.Screen
          name="settings"
          options={{
            title: "Definicoes",
            drawerIcon(props) {
              return (
                <Settings
                  className={props.focused ? "text-primary" : "text-foreground"}
                />
              );
            },
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
