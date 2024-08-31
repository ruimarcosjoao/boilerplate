import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { Link } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import { Forward } from "~/lib/icons/foward";
export default function ForgetPassword() {
  return (
    <View className="flex-1 gap-4 p-6 items-center justify-center">
      <Image
        source={require("../../../assets/images/icon.png")}
        resizeMode="contain"
        className="w-24 h-24"
      />
      <H1>Forget Password</H1>
      <View className="w-full items-center gap-4">
        <View className="p-4 w-full gap-3">
          <View className="gap-1">
            <Label nativeID="email">Email</Label>
            <Input
              placeholder="email to recover account"
              accessibilityLabel="email"
              inputMode="email"
            />
          </View>
          <Link asChild href={"/(auth)/sign-in"}>
            <Button className="w-full flex-row items-center gap-2">
              <Forward className="text-primary-foreground" />
              <Text>Send me code</Text>
            </Button>
          </Link>
        </View>

        <View className="items-center">
          <Link href={"/(auth)/sign-in"}>
            <Text className="text-center underline">
              I remember my password
            </Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
