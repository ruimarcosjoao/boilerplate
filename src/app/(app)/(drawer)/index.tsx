import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H4 } from "@/components/ui/typography";
import { CameraType, useCameraPermissions } from "expo-camera";
import { Link, useNavigation } from "expo-router";
import React, { useState } from "react";
import { Image, ScrollView, View } from "react-native";

export default function Index() {
  const navegation = useNavigation();
  const [scanned, setScanned] = useState(false);
  const [documentData, setDocumentData] = useState({});
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View className="flex-1 items-center justify-center gap-4">
        <Text className="text-2xl font-bold">
          Voce precisa dar acesso a camera!
        </Text>
        <Button onPress={requestPermission}>
          <Text>Conceder acesso</Text>
        </Button>
      </View>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: any; data: any }) => {
    setScanned(true);
    const transformed = getQrCodeTextAndTransformInObject(data);
    setDocumentData(transformed);

    alert(`Nome completo: ${transformed.nome}`);
  };

  function getQrCodeTextAndTransformInObject(data: string) {
    const lines = data.split(/\r?\n|\r/g);
    const transformedData = {
      nome: `${lines[0]} ${lines[1]}`,
      bilheteIdentidade: lines[2],
      cidade: lines[3],
      dataNascimento: lines[4],
      genero: lines[5],
      estadoCivil: lines[6],
      dataEmissao: lines[7],
      dataValidade: lines[8],
      localEmissao: lines[9],
      versao: lines[10],
    };
    return transformedData;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1 }}
      className={`bg-background p-4`}
    >
      <View className={``}>
        <View className="flex-1 gap-4 mb-10">
          <View className="flex-row items-center justify-between">
            <H4 className="text-secondary">Carteira Digital</H4>
            <Link href={"/(app)/documents/all/"}>
              <Text className="text-secondary">Ver todos</Text>
            </Link>
          </View>
          <Card className="p-0">
            <CardContent className="py-6 bg-input">
              <View className="flex-row justify-between">
                <View>
                  <Text className="font-bold text-sm">Nome Completo:</Text>
                  <Text className="uppercase text-sm">
                    Rui Marcos De Carvalho Joao
                  </Text>
                  <Text className="font-bold text-sm">Filiacao:</Text>
                  <Text className="uppercase text-sm">
                    Domingos Marcos Joao
                  </Text>
                  <Text>e</Text>
                  <Text className="uppercase text-sm">Linda Fulama</Text>
                  <Text className="font-bold text-sm">
                    Bilhete de identidade Nº:
                  </Text>
                  <Text className="font-bold uppercase text-lg">
                    005688121LA041
                  </Text>
                </View>
                <Image
                  source={require("@/assets/images/emblema.png")}
                  resizeMode="contain"
                  className="w-20 h-40"
                />
              </View>
            </CardContent>
          </Card>
        </View>
      </View>
      <Link href={"/(app)/documents/add"} asChild>
        <Button
          variant={"secondary"}
          size={"lg"}
          // onPress={() => navegation.dispatch(DrawerActions.openDrawer())}
          className="w-full"
        >
          <Text className="text-xl font-bold text-white">
            Adicionar Documento
          </Text>
        </Button>
      </Link>
    </ScrollView>
  );
}
