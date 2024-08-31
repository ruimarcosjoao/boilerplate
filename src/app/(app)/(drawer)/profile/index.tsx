import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import api from "@/http/api";
import { Camera } from "@/lib/icons/icons";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { z } from "zod";
export const schema = z.object({
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
  const {
    data: profile,
    error,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["get-profile"],
    queryFn: async () =>
      (await api.get<z.infer<typeof schema>>("/profile")).data,
  });

  console.log(profile);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View className="flex-1 p-6 bg-background">
        {isLoading ? (
          <Skeleton className="w-96 h-6" />
        ) : (
          <View className="flex-row items-center justify-between">
            <Text className="text-3xl font-bold">Perfil</Text>
            <Button
              size={"sm"}
              variant={"secondary"}
              className="flex-row items-center ga-1"
            >
              <Camera className="text-foreground" />
              <Text>Mudar foto de perfil</Text>
            </Button>
          </View>
        )}
        <Text>{JSON.stringify(profile, null, 2)}</Text>
      </View>
    </ScrollView>
  );
}
