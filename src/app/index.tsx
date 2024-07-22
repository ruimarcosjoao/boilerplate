import CommandScreen from "@/components/commandScreen";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { H1, H2, P } from "@/components/ui/typography";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
export default function Index() {
  return (
    <View className="flex-1 bg-background p-8 gap-4">
      <H1>Boilerplate</H1>
      <P className="text-justify">
        Este boilerplate foi criado por Rui Marcos, afim de evitar muitos
        atrasos na criação de aplicativos móveis evitando atrasos na
        configuração do projecto usando o react native e o nativewind!
      </P>
      <P className="text-justify">
        O Bailerplate é tem um estilo inspirado no{" "}
        <P className="text-primary">Shadcn UI</P>, que é uma coleção de
        componentes para copiar e colar, este boilerplate é construido por cima
        do <P className="font-bold text-primary">React Native Reusables</P> uma
        coleção de components usando identicos aos do Shadcn UI.
      </P>
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <BottomSheet>
        <BottomSheetOpenTrigger asChild>
          <Button className="gap-3 justify-start px-4 relative">
            <Text>Sobre o criador</Text>
          </Button>
        </BottomSheetOpenTrigger>
        <BottomSheetContent backdropProps={{ opacity: 0.9 }}>
          <BottomSheetView hadHeader={false} className="p-6">
            <BottomSheetHeader>
              <H2>Hello Types</H2>
            </BottomSheetHeader>
            <View className="flex-row items-center justify-between mb-4"></View>
            <P>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus blanditiis nesciunt harum nam quo aliquid nobis
              sapiente sint reprehenderit quaerat ipsum, deleniti quis et iusto
              nostrum hic iure repellat veritatis.
            </P>
            <P>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus blanditiis nesciunt harum nam quo aliquid nobis
              sapiente sint reprehenderit quaerat ipsum, deleniti quis et iusto
              nostrum hic iure repellat veritatis.
            </P>
            <P>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Necessitatibus blanditiis nesciunt harum nam quo aliquid nobis
              sapiente sint reprehenderit quaerat ipsum, deleniti quis et iusto
              nostrum hic iure repellat veritatis.
            </P>
            <View className={"pb-2 pt-4"}></View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      <CommandScreen />

      <Link href={"/form"}>
        <Text>Dar uma olhada no formulário</Text>
      </Link>
    </View>
  );
}
