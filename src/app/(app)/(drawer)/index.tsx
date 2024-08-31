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
    // Camera permissions are still loading.
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
    // console.log(transformed);
    // setDocumentData({});
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

        {/* <View className="">

          <BottomSheet>
            <BottomSheetOpenTrigger asChild>
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
            </BottomSheetOpenTrigger>
            <BottomSheetContent>
              <BottomSheetView>
                <View className="h-96 items-center justify-center gap-2">
                  <View className="h-56 w-56 rounded-lg overflow-hidden">
                    <CameraView
                      onBarcodeScanned={
                        scanned ? undefined : handleBarCodeScanned
                      }
                      barcodeScannerSettings={{
                        barcodeTypes: ["qr", "pdf417"],
                      }}
                      facing={facing}
                      style={{ flex: 1 }}
                    ></CameraView>
                  </View>
                  <Button
                    onPress={toggleCameraFacing}
                    variant={"outline"}
                    className="flex-row gap-1 w-56"
                    size={"sm"}
                  >
                    <SwitchCamera className="text-foreground" />
                    <Text>Virar Camera</Text>
                  </Button>
                  <Button
                    variant={"secondary"}
                    size={"lg"}
                    onPress={() => setScanned(false)}
                    // onPress={() => navegation.dispatch(DrawerActions.openDrawer())}
                    className="w-64 flex-row gap-1"
                  >
                    <QrCode className="text-white" />
                    <Text className="text-xl font-bold text-white">
                      Escanear QR code
                    </Text>
                  </Button>
                  {documentData && Object.keys(documentData).length > 0 && (
                    <Link
                      asChild
                      href={{
                        pathname: `/documents/view`,
                        params: documentData,
                      }}
                    >
                      <Button>
                        <Text>Vizualizar dados</Text>
                      </Button>
                    </Link>
                  )}
                </View>
              </BottomSheetView>
            </BottomSheetContent>
          </BottomSheet>
        </View> */}
        {/* <View className="flex-row items-center justify-between">
          <H4 className="text-foreground">Servicos Populares</H4>
          <Link href={"/(app)/services"}>
            <Text>Ver todos</Text>
          </Link>
        </View>
        <Card className="p-0 bg-input">
          <CardContent className="w-full px-4 py-4 flex-row gap-2 items-center justify-between">
            <View className="flex-row gap-4 items-center">
              <Award className="text-secondary" />
              <Text className="text-lg dark:text-foreground font-medium">
                Serviços Publicos
              </Text>
            </View>
            <ChevronRight className="text-foreground" />
          </CardContent>
        </Card>
        <Card className="p-0 bg-input">
          <CardContent className="w-full px-4 py-4 flex-row gap-2 items-center justify-between">
            <View className="flex-row gap-4 items-center">
              <FileBadge className="text-secondary" />
              <Text className="text-lg dark:text-foreground font-medium">
                Consulta de documentos
              </Text>
            </View>
            <ChevronRight className="text-foreground" />
          </CardContent>
        </Card>
        <View className="gap-4">
          <H4 className="text-foreground">Operações a fazer</H4>
          <Card className="p-0 bg-input">
            <CardContent className="w-full px-4 py-4 flex-row gap-2 items-center justify-between">
              <View className="flex-row gap-4 items-center">
                <Camera className="text-secondary" size={30} />
                <View className="w-[80%]">
                  <Text className="text-lg dark:text-foreground font-medium">
                    Validar Documento
                  </Text>
                  <Small className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </Small>
                </View>
              </View>
              <ChevronRight className="text-foreground" />
            </CardContent>
          </Card>
          <Card className="p-0 bg-input">
            <CardContent className="w-full px-4 py-4 flex-row gap-2 items-center justify-between">
              <View className="flex-row gap-4 items-center">
                <CircleCheckBig className="text-secondary" size={30} />
                <View className="w-[80%]">
                  <Text className="text-lg dark:text-foreground font-medium">
                    Gerir Autorização
                  </Text>
                  <Small className="text-muted-foreground">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </Small>
                </View>
              </View>
              <ChevronRight className="text-foreground" />
            </CardContent>
          </Card>
        </View> */}
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
