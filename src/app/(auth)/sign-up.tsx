import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { signUpUser } from "@/http/sign-up-user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, ScrollView, View } from "react-native";
import { z } from "zod";

const formSchema = z
  .object({
    name: z.string().min(5, {
      message: "O numero deve ter no minimo 5 caracteres",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    phoneNumber: z.string().regex(/^9[1-9]\d{7}$/, {
      message: "Coloque um número válido",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords não coincidem",
    path: ["confirmPassword"],
  });

export default function SignUp() {
  const [checked, setChecked] = React.useState(false);
  const { mutate, isPending, isSuccess, isError, data, error } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (form: {
      email: string;
      password: string;
      name: string;
      phoneNumber: string;
    }) => {
      return await signUpUser(form);
    },
    onSuccess(data, variables, context) {
      setTimeout(() => {
        router.replace("/(auth)/sign-in");
      }, 4000);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex-1 gap-4 p-6 items-center justify-center">
        <Form {...form}>
          <Image
            source={require("../../../assets/images/icon.png")}
            resizeMode="contain"
            className="w-24 h-24"
          />
          <View className="p-4 w-full gap-6">
            <View className="gap-1">
              <H1 className="text-foreground text-center">Criar Conta</H1>
              <Muted className="text-base text-center">
                Insira as suas informações para criar sua conta
              </Muted>
            </View>
            {(data && !data.success) ||
              (isError && (
                <Alert
                  icon={AlertTriangle}
                  variant="destructive"
                  className="justify-center"
                >
                  <AlertTitle className="text-lg">
                    Ja existe um usuario com este email
                  </AlertTitle>
                </Alert>
              ))}
            {data && data.success && (
              <Alert icon={AlertTriangle} variant="success" className="">
                <AlertTitle>Cadastrado com sucesso!</AlertTitle>
              </Alert>
            )}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormInput
                  label="Nome Completo"
                  placeholder="seu nome completo"
                  description="Insira o seu nome completo."
                  autoCapitalize="sentences"
                  autoComplete="name"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormInput
                  label="Email"
                  placeholder="angolano@exemplo.com"
                  description="Coloque um email valido."
                  autoCapitalize="none"
                  autoComplete="email"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormInput
                  label="Número de telefone"
                  placeholder="(+244) 9** *** ***"
                  description="Coloque um número valido"
                  autoCapitalize="none"
                  {...field}
                />
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <View>
                  <FormInput
                    label="Password"
                    placeholder="********"
                    description="Informe a sua palavra passe."
                    secureTextEntry={!checked}
                    autoComplete="password"
                    {...field}
                  />
                </View>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <View>
                  <FormInput
                    label="Confirmar Password"
                    placeholder="********"
                    secureTextEntry={!checked}
                    {...field}
                  />
                  <View className="flex-row items-center gap-2 mt-2">
                    <Checkbox checked={checked} onCheckedChange={setChecked} />
                    <Label nativeID="showpassword">Mostra Palavra passe</Label>
                  </View>
                </View>
              )}
            />
            <Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
              <Text>Cadastrar</Text>
            </Button>
            <View className="items-center">
              <Link href={"/(auth)/sign-in"}>
                <Muted className="text-center underline">Já tenho conta</Muted>
              </Link>
            </View>
          </View>
        </Form>
      </View>
    </ScrollView>
  );
}
