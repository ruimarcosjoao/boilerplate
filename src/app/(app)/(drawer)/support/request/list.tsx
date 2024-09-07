import {
  BottomSheet,
  BottomSheetContent,
  BottomSheetHeader,
  BottomSheetOpenTrigger,
  BottomSheetView,
} from "@/components/ui/bottom-sheet";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput, FormTextarea } from "@/components/ui/form";
import { Text } from "@/components/ui/text";
import { H3, H4 } from "@/components/ui/typography";
import { ChevronLeft } from "@/lib/icons/icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import React from "react";
import { useForm } from "react-hook-form";
import { Pressable, ScrollView, View } from "react-native";
import { z } from "zod";

const requestFormSchema = z.object({
  type: z
    .enum(["FEEDBACK", "BUG_REPORT", "SUGGESTION", "CUSTOMER_SUPPORT"])
    .default("CUSTOMER_SUPPORT"),
  subject: z.string().min(5, { message: "Deve ter mais de 5 caracteres" }),
  description: z.string().min(8, { message: "Deve ter mais de 8 caracteres" }),
  // "userId": "…",
  // "status": "OPEN"
});

export default function List() {
  const form = useForm<z.infer<typeof requestFormSchema>>({
    resolver: zodResolver(requestFormSchema),
  });

  function onSubmit(data: z.infer<typeof requestFormSchema>) {}

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex-1 p-6 bg-background">
        <View className="flex-row items-center justify-between">
          <Pressable
            onPress={() => router.back()}
            //   variant="ghost"
            className="flex-row my-2 w-24 items-center gap-1"
          >
            <ChevronLeft className="text-foreground" />
            <Text>Voltar</Text>
          </Pressable>
          <BottomSheet>
            <BottomSheetOpenTrigger asChild>
              <Button>
                <Text>Novo pedido</Text>
              </Button>
            </BottomSheetOpenTrigger>
            <BottomSheetContent>
              <BottomSheetHeader>
                <H4>Solicitar ajuda</H4>
              </BottomSheetHeader>
              <BottomSheetView className="">
                <View className="mt-4">
                  <Form {...form}>
                    <View className="gap-4">
                      <FormField
                        control={form.control}
                        name="subject"
                        render={({ field }) => {
                          return (
                            <FormInput label="Assunto do suporte" {...field} />
                          );
                        }}
                      />
                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => {
                          return (
                            <FormTextarea
                              label="Descrição do problema"
                              {...field}
                            />
                          );
                        }}
                      />
                      <Button onPress={form.handleSubmit(onSubmit)}>
                        <Text>Fazer pedido</Text>
                      </Button>
                    </View>
                  </Form>
                </View>
              </BottomSheetView>
            </BottomSheetContent>
          </BottomSheet>
        </View>
        <H3 className="">Pedidos de suporte</H3>
      </View>
    </ScrollView>
  );
}
