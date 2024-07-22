import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { H1 } from "@/components/ui/typography";
import { LogIn } from "@/lib/icons/signIn";
import { useSession } from "@/providers/auth";
import { Link, router } from "expo-router";
import React from "react";
import { Image, View } from "react-native";
export default function SignIn() {
  const [checked, setChecked] = React.useState(false);
  const { signIn } = useSession();
  return (
    <View className="flex-1 gap-4 p-6 items-center justify-center">
      <Image
        source={require("../../../assets/images/icon.png")}
        resizeMode="contain"
        className="w-24 h-24"
      />
      <H1>sign in page</H1>
      <View className="w-full items-center gap-4">
        <View className="w-[80%]">
          <Label nativeID="email">Email</Label>
          <Input
            placeholder="put your email"
            accessibilityLabel="email"
            inputMode="email"
          />
        </View>
        <View className="w-[80%]">
          <Label nativeID="email">Passowrd</Label>
          <Input
            placeholder="put your Password"
            accessibilityLabel="password"
            secureTextEntry={!checked}
          />
          <View className="flex-row items-center gap-2 mt-2">
            <Checkbox checked={checked} onCheckedChange={setChecked} />
            <Label nativeID="showpassword">See password</Label>
          </View>
        </View>
        <Button
          onPress={() => {
            signIn();
            router.replace("/(private)/");
          }}
          className="w-[80%] flex-row items-center gap-2"
        >
          <LogIn className="text-primary-foreground" />
          <Text>Login</Text>
        </Button>

        <View className="items-center">
          <Link href={"/(auth)/sign-up"}>
            <Text className="text-center underline">I don't have account</Text>
          </Link>
          <Link href={"/(auth)/forget-password"}>
            <Text className="text-center underline">I forget my password</Text>
          </Link>
        </View>
      </View>
    </View>
  );
}
