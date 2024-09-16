import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Text } from "@/components/ui/text";
import { H3, H4, P, Small } from "@/components/ui/typography";
import api from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import * as ImagePicker from "expo-image-picker";
import { Link } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import { z } from "zod";

export const UserDetails = z.object({
  id: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  name: z.string(),
  avatar: z.string(),
  address: z.string(),
  userDetails: z.object({
    id: z.string(),
    fullName: z.string(),
    birthDate: z.string(),
    gender: z.string(),
    nationality: z.string(),
    maritalStatus: z.string(),
    birthplace: z.string(),
    birthProvince: z.string(),
    height: z.number(),
    residenceAddress: z.string(),
    fatherName: z.string(),
    motherName: z.string(),
  }),
});

export default function Profile() {
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const mimetype = result.assets[0].mimeType;
      setImage(result.assets[0].uri);
    }
  };

  const {
    data: profile,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () =>
      (await api.get<z.infer<typeof UserDetails>>("/profile")).data,
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex-1 p-6 bg-background gap-1">
        <View className="flex-col items-center justify-center gap-0.5">
          <Pressable onPress={pickImage}>
            <Avatar className="h-16 w-16 border" alt={profile?.name as string}>
              <AvatarImage
                source={
                  profile?.avatar
                    ? image
                      ? { uri: image }
                      : { uri: profile?.avatar }
                    : image
                    ? { uri: image }
                    : require("@/assets/images/icon.png")
                }
              />
              <AvatarFallback>
                <Text>
                  {profile?.name
                    .split(" ")
                    .map((value, index) => {
                      if (index < 2) {
                        return value[0];
                      }
                    })
                    .join("")
                    .toUpperCase()}
                </Text>
              </AvatarFallback>
            </Avatar>
          </Pressable>
          <H3>{profile?.name}</H3>
          <P>{profile?.email}</P>
          <P>{profile?.phoneNumber}</P>
        </View>
        {profile?.userDetails.fullName ? (
          <View className="gap-4">
            <View className="bg-input p-6 gap-4 rounded-md">
              <View>
                <Small nativeID="Nomecompleto">Nome Completo</Small>
                <H4>{profile.userDetails.fullName}</H4>
              </View>
              <View>
                <Small nativeID="filiacao">Filiacao</Small>
                <H4>
                  {profile.userDetails.fatherName} &{" "}
                  {profile.userDetails.motherName}
                </H4>
              </View>
              <View className="flex-row items-center gap-4">
                <View>
                  <Small nativeID="filiacao">Natural de</Small>
                  <H4>
                    {profile.userDetails.birthProvince}
                    {", "}
                    {profile.userDetails.birthplace}
                  </H4>
                </View>
                <View>
                  <Small nativeID="genero">Nacionalidade</Small>
                  <H4>{profile.userDetails.nationality}</H4>
                </View>
              </View>
              <View className="flex-row gap-4 items-center">
                <View>
                  <Small nativeID="genero">Genero</Small>
                  <H4>
                    {profile.userDetails.gender === "MALE"
                      ? "Masculino"
                      : "Femenino"}
                  </H4>
                </View>
                <View>
                  <Small nativeID="maritalStatus">Estado Civil</Small>
                  <H4>
                    {profile.userDetails.maritalStatus === "SINGLE"
                      ? "Solteiro(a)"
                      : "Casado(a)"}
                  </H4>
                </View>
                <View>
                  <Small nativeID="altura">Altura</Small>
                  <H4>{profile.userDetails.height} cm</H4>
                </View>
              </View>
              <View>
                <Small nativeID="Nomecompleto">Data de Nascimento</Small>
                <H4>{format(profile.userDetails.birthDate, "dd/MM/yyyy")}</H4>
              </View>
            </View>
            <Link asChild href={"/(app)/(drawer)/profile/update"}>
              <Button>
                <Text>Actualizar meus dados</Text>
              </Button>
            </Link>
          </View>
        ) : (
          <Card>
            <CardHeader>
              <H3 className="text-red-500">Information</H3>
            </CardHeader>
            <CardContent className="p-4 pt-0 gap-2">
              <Text>
                O seu perfil está desatualizado, por favor informe os seus dados
                para complementar o seu cadastro
              </Text>
              <Link asChild href={"/(app)/(drawer)/profile/add"}>
                <Button>
                  <Text>Completar perfil</Text>
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </View>
    </ScrollView>
  );
}
