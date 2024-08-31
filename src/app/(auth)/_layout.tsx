import { Stack } from "expo-router";
import React from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

export default function AuthLayout() {
  // const { session, isLoading } = useSession();

  // if (isLoading) {
  //   return <Text>Loading...</Text>;
  // }
  // useEffect(() => {
  //   if (!session) {
  //     <Redirect href="/(app)/(drawer)/" />;
  //   }
  // }, [session]);

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <Stack
          initialRouteName="sign-in"
          screenOptions={{
            headerShown: false,
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
