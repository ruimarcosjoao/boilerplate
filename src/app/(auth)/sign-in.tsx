import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Form, FormField, FormInput } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { env } from "@/env";
import { signInUser } from "@/http/sign-in-user";
import { resetStore } from "@/lib/use-secure-store";
import { useSession } from "@/providers/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { AlertTriangle } from "lucide-react-native";
import React from "react";
import { useForm } from "react-hook-form";
import { Image, View } from "react-native";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(4, {
    message: "Password must be at least 4 characters.",
  }),
});

export default function SignIn() {
  const [checked, setChecked] = React.useState(false);
  const { signIn } = useSession();
  const { mutate, isPending, isSuccess, isError, data, error } = useMutation({
    mutationKey: ["login"],
    onSuccess(data, variables, context) {
      signIn(data.token);
      resetStore(data);
      form.reset();
      router.replace(env.EXPO_PUBLIC_REDIRECT_SUCCESS);
    },
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      return await signInUser(email, password);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    mutate(values);

    if (isSuccess) {
      signIn(data.token);
    }
  }

  return (
    <View className="flex-1 gap-4 p-6 items-center justify-center">
      <Image
        source={require("../../../assets/images/icon.png")}
        resizeMode="contain"
        className="w-24 h-24"
      />
      <View className="p-4 w-full gap-6">
        <View className="gap-1 w-full">
          <H1 className="text-foreground text-center">Entrar na CDI</H1>
          <Muted className="text-base text-center">
            Insira as suas credencias para poder entrar
          </Muted>
          {isError && (
            <Alert icon={AlertTriangle} variant="destructive" className="">
              <AlertTitle>Verifica as suas credenciais!</AlertTitle>
            </Alert>
          )}
        </View>
        <Form {...form}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormInput
                label="Email"
                placeholder="angolano@exemplo.com"
                description="Não pode ser partilhado."
                autoCapitalize="none"
                autoComplete="email"
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
                <View className="flex-row items-center gap-2 mt-2">
                  <Checkbox checked={checked} onCheckedChange={setChecked} />
                  <Label nativeID="showpassword">Mostra Palavra passe</Label>
                </View>
              </View>
            )}
          />
          <Button onPress={form.handleSubmit(onSubmit)} disabled={isPending}>
            <Text>Entrar</Text>
          </Button>
        </Form>
        <View className="items-center">
          <Link href={"/(auth)/sign-up"}>
            <Muted className="text-center underline">Não tenho conta</Muted>
          </Link>
          <Link href={"/(auth)/forget-password"}>
            <Muted className="text-center underline">
              Esqueci a palavra passe
            </Muted>
          </Link>
        </View>
      </View>
    </View>
  );
}
