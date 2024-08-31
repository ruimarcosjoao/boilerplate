import { Card, CardContent } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";
import { ChevronRight } from "@/lib/icons/icons";
import { useHeaderTitle } from "@/store/use-header-name";
import { Link } from "expo-router";
import { ArchiveRestore } from "lucide-react-native";
import React, { useLayoutEffect } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
export default function Index() {
  const { setHeaderTitle } = useHeaderTitle();

  useLayoutEffect(() => {
    setHeaderTitle("");
  }, []);
  const servicos = [
    {
      id: 1,
      titulo: "Cartão de municipe",
      local: "Kilamba Kiaxe",
    },
    {
      id: 2,
      titulo: "Passaporte",
      local: "SME - Luanda",
    },
    {
      id: 3,
      titulo: "Assento de nascimento",
      local: "Hospitais públicos",
    },
    {
      id: 4,
      titulo: "Recenciamento Miltar",
      local: "Administração distrital",
    },
    {
      id: 5,
      titulo: "Atestado médico",
      local: "Hospitais públicos",
    },
    {
      id: 6,
      titulo: "Serviços do cartório ",
      local: "SIAC - Talatona",
    },
    {
      id: 7,
      titulo: "Registro criminal",
      local: "Esquadra da polícia",
    },
    {
      id: 8,
      titulo: "Bilhete de identidade",
      local: "Administração | BUAP",
    },
  ];
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      className="p-6 bg-background"
    >
      <View className="mb-10">
        <Card className="bg-primary p-0">
          <CardContent className="flex-row gap-4 py-6">
            <View className="flex-1">
              <H3 className="text-white">Servicos</H3>
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
        <View className="mt-14 gap-4">
          <Text className="text-xl font-bold">Servicos de Registro</Text>
          {servicos.map((servico) => {
            return (
              <Link
                key={servico.id}
                asChild
                href={`/(app)/services/${servico.id}?name=${servico.titulo}`}
              >
                <Pressable>
                  <Card className="p-0 bg-input justify-center">
                    <CardContent className="flex-row items-center p-3 gap-4 justify-between">
                      <View className="flex-row items-center gap-4">
                        <ArchiveRestore className="text-secondary" />
                        <View>
                          <Text className="font-bold text-xl text-foreground">
                            {servico.titulo}
                          </Text>
                          <P className="text-muted-foreground text-sm">
                            {servico.local}
                          </P>
                        </View>
                      </View>
                      <View>
                        <ChevronRight className="text-foreground" />
                      </View>
                    </CardContent>
                  </Card>
                </Pressable>
              </Link>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
}
