import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { useSession } from "@/providers/auth";
import React from "react";
import { View } from "react-native";
export default function PrivateRoute() {
  const { signOut } = useSession();
  return (
    <View className="flex-1 items-center justify-center p-4 bg-white">
      <Text className="text-3xl font-bold">PrivateRoute</Text>
      <Button variant={"destructive"} onPress={() => signOut()}>
        <Text>Logout</Text>
      </Button>
    </View>
  );
}
