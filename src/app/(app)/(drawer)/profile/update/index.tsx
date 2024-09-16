import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Text } from "@/components/ui/text";
import { H3, Small } from "@/components/ui/typography";
import api from "@/http/api";
import { updateUserDetails } from "@/http/update-details";
import { RefreshCcw } from "@/lib/icons/icons";
import { cn } from "@/lib/utils";
import { queryClient } from "@/providers/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { useMutation, useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { router } from "expo-router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { z } from "zod";
import { UserDetails } from "..";
export const AddProfileDataSchema = z.object({
  fullName: z.string(),
  birthDate: z
    .string()
    .datetime({ offset: true })
    .min(1, { message: "Please enter your date of birth" })
    .optional(),
  gender: z.enum(["MALE", "FEMALE"]).optional(),
  nationality: z.string().optional(),
  maritalStatus: z
    .enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"])
    .optional(),
  birthplace: z.string().optional(),
  birthProvince: z.string().optional(),
  height: z.coerce
    .number()
    .refine((height) => Number(height))
    .optional(),
  residenceAddress: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
});

const genderSchema = z.array(
  z.object({ label: z.string(), value: z.enum(["MALE", "FEMALE"]) })
);

const maritalStatusSchema = z.array(
  z.object({
    label: z.string(),
    value: z.enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"]),
  })
);

const genders: z.infer<typeof genderSchema> = [
  { label: "Masculino", value: "MALE" },
  { label: "Femenino", value: "FEMALE" },
];

const maritalStatus: z.infer<typeof maritalStatusSchema> = [
  { label: "Solteiro", value: "SINGLE" },
  { label: "Casado", value: "MARRIED" },
];

export default function AddProfileData() {
  const {
    data: userDetails,
    isLoading,
    isError: isErrorOdUserDetails,
    refetch,
  } = useQuery({
    queryKey: ["get-user-detail"],
    queryFn: async () => {
      const response = (await api.get<z.infer<typeof UserDetails>>("/profile"))
        .data;
      return response;
    },
    refetchOnWindowFocus: true,
  });

  const [date, setDate] = useState(new Date("2002-03-26"));

  const onChange = (event: DateTimePickerEvent, selectedDate: Date) => {
    const currentDate = selectedDate;

    form.setValue("birthDate", selectedDate.toISOString());
    setDate(currentDate);
  };

  const showMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: date,
      // @ts-ignore
      onChange,
      mode: currentMode,
      display: "calendar",
      is24Hour: false,
    });
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: async (data: z.infer<typeof AddProfileDataSchema>) =>
      await updateUserDetails(data),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["get-profile"] });
      form.reset();
      router.replace("/(app)/(drawer)/profile");
    },
    onError() {
      scrollRef.current?.scrollTo({ y: 0 });
    },
  });
  const form = useForm<z.infer<typeof AddProfileDataSchema>>({
    resolver: zodResolver(AddProfileDataSchema),
    defaultValues: {
      gender: genders[0].value,
      maritalStatus: maritalStatus[0].value,
      fullName: userDetails?.userDetails.fullName,
      birthDate: String(userDetails?.userDetails.birthDate),
      fatherName: userDetails?.userDetails.fatherName,
      motherName: userDetails?.userDetails.motherName,
      birthplace: userDetails?.userDetails.birthplace,
      nationality: userDetails?.userDetails.nationality,
      height: userDetails?.userDetails.height,
      birthProvince: userDetails?.userDetails.birthProvince,
      residenceAddress: userDetails?.userDetails.residenceAddress,
    },
  });

  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };
  const scrollRef = React.useRef<ScrollView>(null);

  function onSubmit(values: z.infer<typeof AddProfileDataSchema>) {
    // console.log(values);
    mutate(values);
    scrollRef.current?.scrollTo({ y: 0 });
  }

  if (isLoading) {
    return (
      <View className="flex-1 bg-background items-center justify-center">
        <H3>Carregando os dados...</H3>
      </View>
    );
  }

  if (isErrorOdUserDetails) {
    return (
      <View className="flex-1 bg-background items-center justify-center gap-4">
        <H3>OPS... Erro ao carregar</H3>
        <Button onPress={() => refetch}>
          {" "}
          <RefreshCcw className="text-foreground" />
          <Text>Voltar a tentar</Text>
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerClassName="mx-auto w-full max-w-xl"
      showsVerticalScrollIndicator={false}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 12 }}
      style={{ flex: 1 }}
      ref={scrollRef}
    >
      <View className="flex-1 w-full p-6 gap-2 bg-Background">
        {isError && (
          <Alert>
            <AlertTitle>
              <Text>{error.message}</Text>
            </AlertTitle>
          </Alert>
        )}
        <H3>Adicionar os teus dados</H3>
        <Form {...form}>
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  placeholder="Nome Completo"
                  label="Nome completo"
                  description="Seu nome completo que consta no teu documento"
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="gender"
            render={() => {
              return (
                <View>
                  <Label
                    className={cn(
                      form.formState.errors.gender && "text-destructive"
                    )}
                    nativeID={"formItemNativeID"}
                  >
                    Genero
                  </Label>
                  <Select
                    defaultValue={genders[0]}
                    onValueChange={(option) => {
                      // @ts-ignore
                      form.setValue("gender", option?.value);
                    }}
                  >
                    <SelectTrigger className="">
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Select a fruit"
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-[90%]">
                      <SelectGroup>
                        <SelectLabel>Genero</SelectLabel>
                        {genders.map(({ label, value }) => {
                          return (
                            <SelectItem key={value} label={label} value={value}>
                              Apple
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.gender && (
                    <Small className="text-destructive">
                      {form.formState.errors.gender.message}
                    </Small>
                  )}
                </View>
              );
            }}
          />
          <View className="gap-1">
            <Label
              nativeID="date"
              className={`${form.formState.errors.birthDate && "text-red-500"}`}
            >
              Data de Nascimento
            </Label>
            <Button
              onPress={showDatepicker}
              className="text-left"
              variant={"outline"}
            >
              {/* <Text>{format(date, "yyyy-MM-dd")}</Text> */}
              <Text>{format(date, "yyyy-MM-dd")}</Text>
            </Button>
            {form.formState.errors.birthDate && (
              <Small className={`text-red-500`}>
                {form.formState.errors.birthDate.message}
              </Small>
            )}
          </View>
          <FormField
            control={form.control}
            name="residenceAddress"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  inputMode="text"
                  placeholder="Resigencia Actual"
                  label="Residencia Actual"
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="nationality"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  placeholder="Nacionalidade"
                  label="Nacionalidade"
                  description="O pais em que você nasceu"
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="maritalStatus"
            render={() => {
              return (
                <View>
                  <Label
                    className={cn(
                      form.formState.errors.maritalStatus && "text-destructive"
                    )}
                    nativeID={"formItemNativeID"}
                  >
                    Estado Civil
                  </Label>
                  <Select
                    defaultValue={maritalStatus[0]}
                    onValueChange={(option) => {
                      // @ts-ignore
                      form.setValue("maritalStatus", option?.value);
                    }}
                  >
                    <SelectTrigger className="">
                      <SelectValue
                        className="text-foreground text-sm native:text-lg"
                        placeholder="Select a fruit"
                      />
                    </SelectTrigger>
                    <SelectContent insets={contentInsets} className="w-[90%]">
                      <SelectGroup>
                        <SelectLabel>Estado Civil</SelectLabel>
                        {maritalStatus.map(({ label, value }) => {
                          return (
                            <SelectItem key={value} label={label} value={value}>
                              Apple
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {form.formState.errors.maritalStatus && (
                    <Small className="text-destructive">
                      {form.formState.errors.maritalStatus.message}
                    </Small>
                  )}
                </View>
              );
            }}
          />

          <FormField
            control={form.control}
            name="birthplace"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  placeholder="Local de Nascimento"
                  label="Local de Nascimento"
                  description="O local em que você nasceu"
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="birthProvince"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  placeholder="Provincia de Nascimento"
                  label="Provincia de Nascimento"
                  description="A provincia em que você nasceu"
                />
              );
            }}
          />

          <FormField
            control={form.control}
            name="height"
            render={({ field }) => {
              return (
                // @ts-ignore
                <FormInput
                  {...field}
                  inputMode="numeric"
                  placeholder="Altura"
                  label="Altura"
                  description="Sua altura em metros"
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="fatherName"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  placeholder="Nome do pai"
                  label="Nome do pai"
                  description="O nome completo do seu pai"
                />
              );
            }}
          />
          <FormField
            control={form.control}
            name="motherName"
            render={({ field }) => {
              return (
                <FormInput
                  {...field}
                  placeholder="Nome da Mãe"
                  label="Nome da Mãe"
                  description="O nome completo da mae"
                />
              );
            }}
          />

          <Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
            <Text>Enviar</Text>
          </Button>
        </Form>
      </View>
    </ScrollView>
  );
}
