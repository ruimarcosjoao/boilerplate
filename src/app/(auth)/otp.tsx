import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { Link, router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import { Forward } from "~/lib/icons/foward";
export default function OTP() {
  return (
    <View className="flex-1 gap-4 p-6 items-center justify-center">
      <Image
        source={require("../../../assets/images/icon.png")}
        resizeMode="contain"
        className="w-24 h-24"
      />
      <H1>Secret Code</H1>
      <View className="w-full items-center gap-4">
        <View className="w-[80%]">
          <OTPTextInput
            textInputStyle={{
              borderWidth: 1,
              borderRadius: 8,
            }}
            containerStyle={{}}
          />
        </View>
        <Link asChild href={"/"}>
          <Button className="w-[80%] flex-row items-center gap-2">
            <Forward className="text-primary-foreground" />
            <Text>Confirme Code</Text>
          </Button>
        </Link>

        <View className="items-center">
          <Text className="text-center underline" onPress={() => router.back()}>
            Go back
          </Text>
        </View>
      </View>
    </View>
  );
}
