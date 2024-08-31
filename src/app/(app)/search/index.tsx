import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { useHeaderTitle } from "@/store/use-header-name";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { Search } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { View } from "react-native";
export default function Index() {
  const { setHeaderTitle } = useHeaderTitle();

  useLayoutEffect(() => {
    setHeaderTitle("");
  }, []);

  return (
    <View className="flex-1 p-4 bg-background">
      <View className={"flex-row items-center gap-2"}>
        <Input
          placeholder="Pesquisar"
          className="bg-input rounded-full flex-1 px-4"
        />
        <Button className="rounded-full">
          <Search color={"white"} size={18} />
        </Button>
      </View>
      <FlashList
        data={[
          "SME",
          "Administracao",
          "Passaport",
          "BI",
          "Registro crimonal",
          "acento de nascimento",
          "Cartorio",
        ]}
        horizontal
        className="my-3"
        estimatedItemSize={20}
        showsHorizontalScrollIndicator={false}
        renderItem={(info) => {
          return (
            <Link
              href={`/(app)/search/tags/${info.item}`}
              asChild
              key={info.index}
            >
              <Badge className="mx-px px-4 py-1.5">
                <Text>{info.item}</Text>
              </Badge>
            </Link>
          );
        }}
      />
      <Text className="text-xl font-bold">Index</Text>
    </View>
  );
}
