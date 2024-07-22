import { Badge } from "@/components/ui/badge";
import { Text } from "@/components/ui/text";
import { H3, P } from "@/components/ui/typography";
import React from "react";
import { View } from "react-native";
("@/components/ui/typography");
export default function Red() {
  return (
    <View className="flex-1 p-4 bg-white">
      <H3 className="border-none">Red</H3>
      <P className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis alias
        rerum id fugiat sint nam, nisi quod ipsum voluptates architecto
        voluptate sunt nemo magni, quibusdam est similique inventore amet quo.
      </P>
      <View className="flex-row gap-2 items-center my-4">
        <Badge className="">
          <Text>Default</Text>
        </Badge>
        <Badge variant={"secondary"}>
          <Text>Secondary</Text>
        </Badge>
        <Badge variant={"outline"}>
          <Text>Secondary</Text>
        </Badge>
        <Badge variant={"destructive"}>
          <Text>Secondary</Text>
        </Badge>
      </View>
    </View>
  );
}
