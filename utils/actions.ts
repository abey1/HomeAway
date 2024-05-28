"use server";
import { profileSchema } from "@/utils/schemas";

export const createProfileAction = async (
  prevState: any,
  formData: FormData
) => {
  try {
    const rawData = Object.fromEntries(formData);
    console.log(rawData);
    const validatedFields = profileSchema.parse(rawData);
    return { message: "profile created", success: true };
  } catch (error) {
    console.log(error);
    return { message: "some error occurred...", success: false };
  }
};
