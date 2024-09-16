import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { Small } from "@/components/ui/typography";
import { Bell, FileInput } from "@/lib/icons/icons";
import Notifications from "@/mocks/notification.json";
import { FlashList } from "@shopify/flash-list";
import React from "react";
import { View } from "react-native";

export default function Index() {
  const [value, setValue] = React.useState("Notificações");
  return (
    <View className="flex-1 p-4">
      <Tabs
        value={value}
        onValueChange={setValue}
        className="w-full max-w-[400px] mx-auto flex-col gap-1.5"
      >
        <TabsList className="flex-row w-full">
          <TabsTrigger
            value="Notificações"
            className="flex-1 flex-row items-center gap-2"
          >
            <Bell size={18} className="text-primary" />
            <Text>Notificações</Text>
          </TabsTrigger>
          <TabsTrigger
            value="Pedidos"
            className="flex-1 flex-row items-center gap-2"
          >
            <FileInput size={18} className="text-primary" />
            <Text className="">Pedidos</Text>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Notificações" className="bg-transparent">
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <CardTitle>Notificações Gerais</CardTitle>
            </CardHeader>
            <CardContent className="gap-4 native:gap-2">
              <View style={{ width: "auto", height: 500 }}>
                <FlashList
                  showsVerticalScrollIndicator={false}
                  data={Notifications}
                  estimatedItemSize={200}
                  contentContainerStyle={{ paddingBottom: 4 }}
                  renderItem={({ item }) => {
                    return <NotificationItem item={item} />;
                  }}
                />
              </View>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="Pedidos" className="bg-transparent">
          <Card className="border-0 bg-transparent">
            <CardHeader>
              <CardTitle>Pedidos</CardTitle>
              <CardDescription>Pedidos feitos por voce.</CardDescription>
            </CardHeader>
            <CardContent className="gap-4 native:gap-2">
              <View style={{ width: "auto", height: 500 }}>
                <FlashList
                  showsVerticalScrollIndicator={false}
                  data={Notifications}
                  estimatedItemSize={200}
                  contentContainerStyle={{ paddingBottom: 4 }}
                  renderItem={({ item }) => {
                    return <NotificationItem item={item} />;
                  }}
                />
              </View>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </View>
  );
}

function NotificationItem({
  item,
}: {
  item: {
    id: number | string;
    title: string;
    status: boolean;
  };
}) {
  return (
    <View
      key={item.id}
      className="flex-row gap-3 p-4 rounded-md border border-input overflow-hidden items-center w-full mb-4 h-auto"
    >
      <Bell className="text-primary" />
      <View className="flex-1 ">
        <Text className="font-bold">{item.title}</Text>
        <Small className="font-normal">
          {item.status
            ? "Aceite pelo fulano de tal"
            : "recusado pelo fulano de tal"}
        </Small>
      </View>
    </View>
  );
}
