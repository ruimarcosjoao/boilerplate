import { Text } from "@/components/ui/text";
import { SessionProvider } from "@/providers/auth";
import { QueryProvider } from "@/providers/react-query";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Theme, ThemeProvider } from "@react-navigation/native";
import { PortalHost } from "@rn-primitives/portal";
import { SplashScreen, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import "../styles/global.css";

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

// Prevent the splash screen from auto-hiding before getting the color scheme.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme, setColorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  React.useEffect(() => {
    (async () => {
      const theme = await AsyncStorage.getItem("theme");

      if (!theme) {
        AsyncStorage.setItem("theme", colorScheme);
        setIsColorSchemeLoaded(true);
        return;
      }
      const colorTheme = theme === "dark" ? "dark" : "light";
      if (colorTheme !== colorScheme) {
        setColorScheme(colorTheme);

        setIsColorSchemeLoaded(true);
        return;
      }
      setIsColorSchemeLoaded(true);
    })().finally(() => {
      SplashScreen.hideAsync();
    });
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar backgroundColor="#0E0A68" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <QueryProvider>
          <BottomSheetModalProvider>
            <SessionProvider>
              <Stack
                initialRouteName="(app)"
                screenOptions={{
                  headerBackTitle: "Voltar",
                  headerTitle(props) {
                    return (
                      <Text className="text-xl font-semibold">
                        {toOptions(props.children)}
                      </Text>
                    );
                  },
                }}
              >
                <Stack.Screen name="index" options={{ title: "Home" }} />
                <Stack.Screen name="form" options={{ title: "Formulário" }} />
                <Stack.Screen
                  name="model"
                  options={{ title: "Login Exemple" }}
                />
                <Stack.Screen
                  name="modal"
                  options={{
                    title: "Este e um modal",
                    presentation: "modal",
                  }}
                />

                <Stack.Screen
                  name="(auth)"
                  options={{
                    headerShown: false,
                  }}
                />
                <Stack.Screen
                  name="(app)"
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack>
            </SessionProvider>
          </BottomSheetModalProvider>
        </QueryProvider>
        <PortalHost />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}

function toOptions(name: string) {
  const title = name
    .split("-")
    .map(function (str: string) {
      return str.replace(/\b\w/g, function (char) {
        return char.toUpperCase();
      });
    })
    .join(" ");
  return title;
}
