// @ts-ignore
import Docker from "@/assets/images/docker-3.svg";
// @ts-ignore

import Gennius from "@/assets/images/gennius.svg";
// @ts-ignore

import Git from "@/assets/images/git-icon.svg";
// @ts-ignore

import Nodejs from "@/assets/images/nodejs.svg";
// @ts-ignore

import Python from "@/assets/images/python-5.svg";
// @ts-ignore

import { default as ReactNative } from "@/assets/images/react-native-1.svg";
// @ts-ignore

import Tailwindcss from "@/assets/images/tailwind-css-2.svg";
// @ts-ignore

import Typescript from "@/assets/images/typescript.svg";

import CommandScreen from "@/components/commandScreen";
import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { H1, H3, H4, P } from "@/components/ui/typography";
import { useStore } from "@/store/user-store";
import { Marquee } from "@animatereactnative/marquee";
import * as Linking from "expo-linking";
import { Link } from "expo-router";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
export default function Index() {
  const { count, increment } = useStore();
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
              <H3>Eu sou o Rui</H3>
            </BottomSheetHeader>
            <View className="flex-row items-center justify-between mb-4"></View>
            <P>
              Olá eu sou o Rui Marcosj, um jovem programador e amante de tudo
              que é tecnologia, Sou desenvolvedor Full Stack, mas sou muito
              apaixonado por Mobile e Back-end.
            </P>
            <P>
              {"\n"}
              Como muitos desenvolvedores, passamos por diversos atrasos no
              desenvolvimento de um projecto, principalmente com questões de
              cofigurações, por este motivo criei este boilerplate a fim de
              ajudar desenvolvedores back end poderem reduzir esse tempo de
              configuração
            </P>
            <Button
              className="mt-4"
              onPress={() =>
                Linking.openURL("https://www.linkedin.com/in/rui-marcos-joao/")
              }
            >
              <P>Visite meu perfil no Linkedin</P>
            </Button>
            <H4 className="my-4">As tecnologias que eu uso</H4>
            <Marquee spacing={20} speed={1}>
              <View className="flex-row items-center gap-4">
                <Nodejs width={120} height={40} />
                <Typescript width={40} height={40} />
                <ReactNative width={40} height={40} />
                <Tailwindcss width={40} height={40} />
                <Python width={40} height={40} />
                <Docker width={120} height={40} />
                <Git width={40} height={40} />
                <Gennius width={120} height={40} />
              </View>
            </Marquee>
            <View className={"pb-2 pt-4"}></View>
          </BottomSheetView>
        </BottomSheetContent>
      </BottomSheet>
      <CommandScreen />
      <Button onPress={() => increment()}>
        <Text>Adicionar mais {count}</Text>
      </Button>
      <Link asChild href={"/(private)/"}>
        <Button>
          <Text>Ir para tela privada</Text>
        </Button>
      </Link>
      <Link href={"/form"}>
        <Text>Dar uma olhada no formulário</Text>
      </Link>
      <Link href={"/model"}>
        <Text>Formulario de login</Text>
      </Link>
      <Link href={"/top-tab"}>
        <Text>Um novo tipo de navegacao</Text>
      </Link>
      <Link href={"/modal"}>
        <Text>Abrir um modal</Text>
      </Link>
    </View>
  );
}
