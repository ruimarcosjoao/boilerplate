import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H3 } from "@/components/ui/typography";
import { Link } from "expo-router";
import { MessageCircleDashed } from "lucide-react-native";
import React from "react";
import { ScrollView, View } from "react-native";
export default function Index() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex-1 p-6 bg-background">
        <View className="flex-row mb-2 flex-wrap items-center justify-between">
          <H3 className="text-3xl font-bold">Suporte para o app</H3>
          <Link href={"/(app)/(drawer)/support/request/list"} asChild>
            <Button variant={"outline"}>
              <MessageCircleDashed color={"#000"} />
            </Button>
          </Link>
        </View>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
          eveniet dicta at amet totam libero repudiandae provident earum
          expedita soluta consequuntur incidunt officia, natus reprehenderit
          deleniti iste architecto autem minima.
        </Text>

        <View className="mt-4">
          <Accordion type="single">
            <AccordionItem value="pergunta 1">
              <AccordionTrigger>
                <Text>O que é a Carteira Digital de Identificação?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, culpa, in doloribus impedit, officia magni aperiam
                  perferendis ipsa fugit et architecto. Ipsam eius corporis
                  pariatur quos vero possimus ratione iure!
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pergunta 2">
              <AccordionTrigger>
                <Text>Quais documentos, eu posso adicionar?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, culpa, in doloribus impedit, officia magni aperiam
                  perferendis ipsa fugit et architecto. Ipsam eius corporis
                  pariatur quos vero possimus ratione iure!
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pergunta 3">
              <AccordionTrigger>
                <Text>Como verificar meus documentos?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, culpa, in doloribus impedit, officia magni aperiam
                  perferendis ipsa fugit et architecto. Ipsam eius corporis
                  pariatur quos vero possimus ratione iure!
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pergunta 4">
              <AccordionTrigger>
                <Text>Como meus documentos estão seguros?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, culpa, in doloribus impedit, officia magni aperiam
                  perferendis ipsa fugit et architecto. Ipsam eius corporis
                  pariatur quos vero possimus ratione iure!
                </Text>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="pergunta 5">
              <AccordionTrigger>
                <Text>Recuperar minha conta?</Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optio, culpa, in doloribus impedit, officia magni aperiam
                  perferendis ipsa fugit et architecto. Ipsam eius corporis
                  pariatur quos vero possimus ratione iure!
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>
      </View>
    </ScrollView>
  );
}
