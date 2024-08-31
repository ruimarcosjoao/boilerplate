import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H3, P } from "@/components/ui/typography";
import { useHeaderTitle } from "@/store/use-header-name";
import { useLocalSearchParams } from "expo-router";
import React, { useLayoutEffect } from "react";
import { Image, View } from "react-native";
export default function ServiceById() {
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { setHeaderTitle } = useHeaderTitle();

  useLayoutEffect(() => {
    setHeaderTitle(name as string);
  }, [name]);

  return (
    <View className="flex-1 p-6 gap-2 bg-background">
      <Card className="bg-primary p-0">
        <CardContent className="flex-row gap-4 py-6">
          <View className="flex-1">
            <H3 className="text-white">Você Sabia?</H3>
            <P className="text-gray-300 text-sm leading-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
              adipisci explicabo
            </P>
          </View>
          <View>
            <Image
              source={require("@/assets/images/servicos.png")}
              resizeMode="contain"
              className="w-20 h-20"
            />
          </View>
        </CardContent>
      </Card>
      <Card className="bg-primary/50 p-0">
        <CardContent className="flex-row items-center justify-center gap-4 py-6">
          {/* <View className=""> */}
          <H3 className="text-white">Servico publico</H3>
          {/* </View> */}
        </CardContent>
      </Card>
      <View className="gap-4 mt-6">
        <Text className="text-3xl font-bold">{name}</Text>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          incidunt expedita perspiciatis rem dolorum omnis itaque inventore eum
          assumenda! Enim nihil maiores vitae quod dicta tenetur amet nesciunt
          cumque perspiciatis.
        </P>
        <P>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique
          incidunt expedita perspiciatis rem dolorum omnis itaque inventore eum
          assumenda! Enim nihil maiores vitae quod dicta tenetur amet nesciunt
          cumque perspiciatis.
        </P>
      </View>
    </View>
  );
}
