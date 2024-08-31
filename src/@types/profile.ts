import { z } from "zod";

export const userProfileResponse = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  phoneNumber: z.string(),
  name: z.string(),
  avatar: z.nullable(z.string().url()),
  address: z.nullable(z.string()),
  userDetails: z
    .object({
      id: z.string().uuid().nullable().optional(),
      fullName: z.string().nullable().optional(),
      birthDate: z.date().nullable().optional(),
      gender: z.enum(["MALE", "FEMALE"]).default("MALE").nullable().optional(),
      nationality: z.string().nullable().optional(),
      maritalStatus: z
        .enum(["SINGLE", "MARRIED", "DIVORCED", "WIDOWED"])
        .default("SINGLE")
        .nullable()
        .optional(),
      birthplace: z.string().nullable().optional(),
      birthProvince: z.string().nullable().optional(),
      height: z.number().nullable().optional(),
      residenceAddress: z.string().nullable().optional(),
      fatherName: z.string().optional(),
      motherName: z.string().nullable().optional(),
    })
    .nullable(),
});
